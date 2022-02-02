import React from 'react'
import { useAuth } from './context/auth'
import AuthenticatedApp from './AuthenticatedApp'
import FullPageSpinner from '@/components/FullPageSpinner'
import SignIn from '@/screens/SignIn'

function App() {
  const { user } = useAuth()
  return (
    <React.Suspense fallback={<FullPageSpinner />}>
      {user ? <AuthenticatedApp /> : <SignIn />}
    </React.Suspense>
  )
}

export default App
