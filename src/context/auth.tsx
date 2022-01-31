import React from 'react'
import { useQueryClient } from 'react-query'
// import * as auth from 'auth-provider'
// import {client} from 'utils/api-client'
import { useAsync } from '@/hooks'
// import {setQueryDataForBook} from 'utils/books'
import FullPageSpinner from '@/components/FullPageSpinner'
import FullPageErrorFallback from '@/components/FullPageErrorFallback'

const queryClient = useQueryClient()

async function bootstrapAppData() {
  const user = null

  // const token = await auth.getToken()
  // if (token) {
  //   const data = await client('bootstrap', {token})
  //   queryClient.setQueryData('list-items', data.listItems)
  //   for (const listItem of data.listItems) {
  //     setQueryDataForBook(listItem.book)
  //   }
  //   user = data.user
  // }
  // return user
}

const AuthContext = React.createContext()
AuthContext.displayName = 'AuthContext'

function AuthProvider(props: any) {
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
    // auth.logout()
    queryClient.clear()
    setData(null)
  }, [setData])

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
  return React.useCallback(
    (endpoint, config) => client(endpoint, { ...config, token }),
    [token],
  )
}

export { AuthProvider, useAuth, useClient }
