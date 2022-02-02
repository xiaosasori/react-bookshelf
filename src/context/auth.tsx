import React from 'react'
import { useQueryClient } from 'react-query'
import * as auth from '@/auth-provider'
import { getBootstrap, setToken } from '@/api'

import { useAsync } from '@/hooks'
// import {setQueryDataForBook} from 'utils/books'
import FullPageSpinner from '@/components/FullPageSpinner'
import FullPageErrorFallback from '@/components/FullPageErrorFallback'
import type { User } from '@/types'

interface AuthContextType {
  user: User
  login: () => void
  logout: () => void
  register: () => void
}
// non-null assertion here means during runtime
// the parameter will now be null or undefined
const AuthContext = React.createContext<AuthContextType>(undefined!)
AuthContext.displayName = 'AuthContext'

function AuthProvider(props: any) {
  const queryClient = useQueryClient()

  async function bootstrapAppData() {
    let user: any = null
    const token = await auth.getToken()
    if (token) {
      setToken(token)
      const data = await getBootstrap() as any
      // queryClient.setQueryData('list-items', data.listItems)
      // for (const listItem of data.listItems) {
      //   setQueryDataForBook(listItem.book)
      // }
      user = data.user
    }
    return user
  }

  const {
    data: user,
    status,
    error,
    isLoading,
    isIdle,
    isError,
    isSuccess,
    run,
    setData,
  } = useAsync()

  React.useEffect(() => {
    const appDataPromise = bootstrapAppData()
    run(appDataPromise)
  }, [run])

  const login = React.useCallback(
    form => auth.login(form).then(user => setData(user)),
    [setData],
  )
  const register = React.useCallback(
    form => auth.register(form).then(user => setData(user)),
    [setData],
  )
  const logout = React.useCallback(() => {
    auth.logout()
    queryClient.clear()
    setData(null)
  }, [queryClient, setData])

  const value = React.useMemo(
    () => ({ user, login, logout, register }),
    [login, logout, register, user],
  )

  if (isLoading || isIdle)
    return <FullPageSpinner />

  if (isError)
    return <FullPageErrorFallback error={error} />

  if (isSuccess)
    return <AuthContext.Provider value={value} {...props} />

  throw new Error(`Unhandled status: ${status}`)
}

function useAuth() {
  const context = React.useContext(AuthContext)
  if (context === undefined)
    throw new Error('useAuth must be used within a AuthProvider')

  return context
}

function useClient() {
  const { user } = useAuth()
  const token = user?.token
  if (token) setToken(token)
}

export { AuthProvider, useAuth, useClient }
