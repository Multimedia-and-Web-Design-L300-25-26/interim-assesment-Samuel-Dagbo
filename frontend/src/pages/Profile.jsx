import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { fetchCryptos } from '../utils/api'

function Profile() {
  const { user, token, loading, logout, buyCrypto, sellCrypto } = useContext(AuthContext)
  const navigate = useNavigate()
  const [tradeSymbol, setTradeSymbol] = useState('')
  const [tradeAmount, setTradeAmount] = useState('')
  const [tradeType, setTradeType] = useState('buy')
  const [tradeLoading, setTradeLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [showTradeForm, setShowTradeForm] = useState(false)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-gray-500">Loading...</div>
      </div>
    )
  }

  if (!user && !token) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Please sign in</h2>
          <p className="text-gray-600 mb-4">Sign in to view your profile</p>
          <Link to="/login" className="text-[#0052FF] hover:underline font-medium">
            Sign in
          </Link>
        </div>
      </div>
    )
  }

  const handleTrade = async (e) => {
    e.preventDefault()
    setTradeLoading(true)
    setMessage('')
    try {
      if (tradeType === 'buy') {
        await buyCrypto(tradeSymbol.toUpperCase(), parseFloat(tradeAmount))
        setMessage('Purchase successful!')
      } else {
        await sellCrypto(tradeSymbol.toUpperCase(), parseFloat(tradeAmount))
        setMessage('Sale successful!')
      }
      setTradeSymbol('')
      setTradeAmount('')
      setShowTradeForm(false)
    } catch (err) {
      setMessage(err.response?.data?.message || 'Trade failed')
    } finally {
      setTradeLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
  }

  const portfolioValue = user.holdings?.reduce((sum, h) => sum + (h.amount * (h.avgBuyPrice || 0)), 0) || 0
  const totalValue = user.balance + portfolioValue

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">My Portfolio</h1>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <p className="text-sm text-gray-500 mb-1">Available Balance</p>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(user.balance)}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <p className="text-sm text-gray-500 mb-1">Portfolio Value</p>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(portfolioValue)}</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <p className="text-sm text-gray-500 mb-1">Total Value</p>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalValue)}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">My Holdings</h2>
            <button
              onClick={() => setShowTradeForm(!showTradeForm)}
              className="bg-[#0052FF] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
            >
              {showTradeForm ? 'Cancel' : 'Buy / Sell'}
            </button>
          </div>

          {showTradeForm && (
            <form onSubmit={handleTrade} className="mb-6 p-4 bg-gray-50 rounded-lg">
              {message && (
                <p className={`text-sm mb-4 ${message.includes('successful') ? 'text-green-600' : 'text-red-600'}`}>
                  {message}
                </p>
              )}
              <div className="grid md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select
                    value={tradeType}
                    onChange={(e) => setTradeType(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  >
                    <option value="buy">Buy</option>
                    <option value="sell">Sell</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Symbol</label>
                  <input
                    type="text"
                    value={tradeSymbol}
                    onChange={(e) => setTradeSymbol(e.target.value.toUpperCase())}
                    placeholder="BTC"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                  <input
                    type="number"
                    step="any"
                    value={tradeAmount}
                    onChange={(e) => setTradeAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    required
                  />
                </div>
                <div className="flex items-end">
                  <button
                    type="submit"
                    disabled={tradeLoading}
                    className="w-full bg-[#0052FF] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
                  >
                    {tradeLoading ? 'Processing...' : 'Submit'}
                  </button>
                </div>
              </div>
            </form>
          )}

          {user.holdings?.length > 0 ? (
            <div className="space-y-3">
              {user.holdings.map((holding, index) => (
                <div key={index} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0">
                  <div>
                    <p className="font-medium text-gray-900">{holding.symbol}</p>
                    <p className="text-sm text-gray-500">{holding.amount} coins</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{formatCurrency(holding.amount * holding.avgBuyPrice)}</p>
                    <p className="text-sm text-gray-500">@ {formatCurrency(holding.avgBuyPrice)}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No holdings yet. Start trading!</p>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Transaction History</h2>
          
          {user.transactions?.length > 0 ? (
            <div className="space-y-3">
              {user.transactions.slice(0, 10).map((tx, index) => (
                <div key={index} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0">
                  <div>
                    <p className="font-medium text-gray-900">
                      <span className={tx.type === 'buy' ? 'text-green-600' : 'text-red-600'}>
                        {tx.type.toUpperCase()}
                      </span> {tx.symbol}
                    </p>
                    <p className="text-sm text-gray-500">{tx.amount} coins @ {formatCurrency(tx.price)}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{formatCurrency(tx.total)}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(tx.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No transactions yet.</p>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Account</h2>
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-500">Name</span>
              <span className="font-medium text-gray-900">{user.name}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-500">Email</span>
              <span className="font-medium text-gray-900">{user.email}</span>
            </div>
            <button
              onClick={handleLogout}
              className="w-full mt-4 text-center text-red-600 hover:text-red-700 text-sm font-medium"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile