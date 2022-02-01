// import FullPageSpinner from '@/components/FullPageSpinner'
import { Route, BrowserRouter as Router, Link as RouterLink, Routes, useMatch } from 'react-router-dom'
import Discover from '@/screens/Discover'
import SignIn from '@/screens/SignIn'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/discover" element={<Discover />} />
        </Routes>
        {/* <FullPageSpinner /> */}
        {/* <SignIn /> */}
      </div>
    </Router>
  )
}

export default App
