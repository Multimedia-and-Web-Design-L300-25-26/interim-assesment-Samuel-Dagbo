import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import WarningBanner from './components/WarningBanner'
import FooterDisclaimer from './components/FooterDisclaimer'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import CryptoList from './pages/CryptoList'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <WarningBanner />
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/cryptos" element={<CryptoList />} />
              <Route path="/explore" element={<CryptoList />} />
            </Routes>
          </main>
          <FooterDisclaimer />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App