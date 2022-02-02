import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import Button from '@/components/base/Button'
import FullPageErrorFallback from '@/components/FullPageErrorFallback'
import { useAuth } from '@/context/auth'
import Discover from '@/screens/Discover'
import NotFound from '@/screens/NotFound'
// import {ReadingListScreen} from './screens/reading-list'
// import {FinishedScreen} from './screens/finished'
// import {BookScreen} from './screens/book'
import Layout from '@/layouts/default'

function AuthenticatedApp() {
  const { user, logout } = useAuth()
  return (
    <ErrorBoundary FallbackComponent={FullPageErrorFallback}>
      <div
        css={{
          display: 'flex',
          alignItems: 'center',
          position: 'absolute',
          top: '10px',
          right: '10px',
        }}
      >
        {user.username}
        <Button variant="secondary" css={{ marginLeft: '10px' }} onClick={logout}>
          Logout
        </Button>
      </div>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<div>zxc</div>} />
            <Route path="/discover" element={<Discover />} />
            <Route path="*" element={<NotFound/>} />
          </Route>
        </Routes>
      </Router>
    </ErrorBoundary>
  )
}

export default AuthenticatedApp
