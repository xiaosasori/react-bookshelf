import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import Button from '@/components/base/Button'
import FullPageErrorFallback from '@/components/FullPageErrorFallback'
import { useAuth } from '@/context/auth'
import Discover from '@/screens/Discover'
import NotFound from '@/screens/NotFound'
import ReadingList from '@/screens/ReadingList'
import Finished from '@/screens/Finished'
import Book from '@/screens/Book'
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
            <Route path="/list" element={<ReadingList />} />
            <Route path="/finished" element={<Finished />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/book/:bookId" element={<Book />} />
            <Route path="*" element={<NotFound/>} />
          </Route>
        </Routes>
      </Router>
    </ErrorBoundary>
  )
}

export default AuthenticatedApp
