import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(null)
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const menuItems = {
    Crypto: ['Bitcoin', 'Ethereum', 'Tether', 'BNB', 'Solana'],
    Trade: ['Buy & sell', 'Advanced Trade', 'Earn', 'Wallet'],
    Learn: ['Learn', 'Blog', 'Help Center', 'Community']
  }

  return (
    <nav className="bg-white text-gray-900 border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center">
              <svg viewBox="0 0 60 60" className="h-8 w-8">
                <circle cx="30" cy="30" r="30" fill="#0052FF"/>
                <text x="30" y="38" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold">C</text>
              </svg>
            </Link>
            
            <div className="hidden lg:flex items-center space-x-6">
              <Link to="/explore" className="text-sm text-gray-600 hover:text-[#0052FF] font-medium">
                Explore
              </Link>
              {Object.keys(menuItems).map((item) => (
                <div key={item} className="relative">
                  <button 
                    className="flex items-center text-sm text-gray-600 hover:text-[#0052FF] font-medium"
                    onMouseEnter={() => setDropdownOpen(item)}
                    onMouseLeave={() => setDropdownOpen(null)}
                  >
                    {item}
                  </button>
                  {dropdownOpen === item && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg py-2 z-50 border border-gray-100">
                      {menuItems[item].map((subItem) => (
                        <Link key={subItem} to="/cryptos" className="block px-4 py-2 hover:bg-gray-50 text-sm">
                          {subItem}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/profile" className="text-sm text-gray-600 hover:text-[#0052FF] font-medium">Profile</Link>
                <button
                  onClick={handleLogout}
                  className="text-sm text-gray-600 hover:text-[#0052FF] font-medium"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm text-gray-600 hover:text-[#0052FF] font-medium">Sign in</Link>
                <Link
                  to="/register"
                  className="bg-[#0052FF] hover:bg-blue-700 px-4 py-2 rounded-full text-sm font-medium text-white"
                >
                  Sign up
                </Link>
              </>
            )}
            <button
              className="lg:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden border-t border-gray-200 pb-4">
          <Link to="/explore" className="block px-4 py-2 text-sm text-gray-700 font-medium hover:bg-gray-50">
            Explore
          </Link>
          {Object.keys(menuItems).map((item) => (
            <div key={item} className="px-4 py-2">
              <div className="text-sm text-gray-500 font-medium">{item}</div>
              {menuItems[item].map((subItem) => (
                <Link key={subItem} to="/cryptos" className="block px-4 py-2 hover:bg-gray-50">
                  {subItem}
                </Link>
              ))}
            </div>
          ))}
        </div>
      )}
    </nav>
  )
}

export default Navbar