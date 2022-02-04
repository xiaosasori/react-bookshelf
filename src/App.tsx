import React from 'react'
import { useAuth } from './context/auth'
import FullPageSpinner from '@/components/FullPageSpinner'

const AuthenticatedApp = React.lazy(() =>
  import('./AuthenticatedApp'),
)
const SignIn = React.lazy(() => import('@/screens/SignIn'))

function App() {
  const { user } = useAuth()
  return (
    <React.Suspense fallback={<FullPageSpinner />}>
      {user ? <AuthenticatedApp /> : <SignIn />}
    </React.Suspense>
  )
}

export default App
