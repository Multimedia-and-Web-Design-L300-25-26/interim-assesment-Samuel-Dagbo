import { useEffect, useState } from 'react'
import { fetchCryptos, fetchGainers, fetchNewListings } from '../utils/api'

function CryptoList() {
  const [cryptos, setCryptos] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState(' Tradable')

  useEffect(() => {
    loadCryptos()
  }, [filter])

  const loadCryptos = async () => {
    setLoading(true)
    try {
      let res
      switch (filter.trim()) {
        case 'Top gainers':
          res = await fetchGainers()
          break
        case 'New listings':
          res = await fetchNewListings()
          break
        default:
          res = await fetchCryptos()
      }
      setCryptos(res.data)
    } catch (err) {
      console.error('Error loading cryptos:', err)
    } finally {
      setLoading(false)
    }
  }

  const formatPrice = (price) => {
    if (price >= 1000) return `$${price.toLocaleString(undefined, { maximumFractionDigits: 2 })}`
    if (price >= 1) return `$${price.toFixed(2)}`
    return `$${price.toFixed(6)}`
  }

  const formatMarketCap = (cap) => {
    if (cap >= 1e12) return `$${(cap / 1e12).toFixed(2)}T`
    if (cap >= 1e9) return `$${(cap / 1e9).toFixed(2)}B`
    if (cap >= 1e6) return `$${(cap / 1e6).toFixed(2)}M`
    return `$${cap.toLocaleString()}`
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Explore crypto</h1>

        <div className="flex space-x-4 mb-8 overflow-x-auto pb-2">
          {['Tradable', 'Top gainers', 'New listings'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                filter.trim() === tab
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {cryptos.map((crypto) => (
              <div
                key={crypto._id}
                className="bg-gray-50 hover:bg-gray-100 rounded-xl p-5 transition-colors cursor-pointer"
              >
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-[#0052FF] flex items-center justify-center text-white font-bold">
                    {crypto.symbol.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <div className="font-medium text-gray-900">{crypto.symbol}</div>
                    <div className="text-xs text-gray-500">{crypto.name}</div>
                  </div>
                </div>
                <div className="text-xl font-semibold text-gray-900 mb-1">
                  {formatPrice(crypto.price)}
                </div>
                <div className={`text-sm ${crypto.change24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {crypto.change24h >= 0 ? '+' : ''}{crypto.change24h.toFixed(2)}%
                </div>
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Market cap</span>
                    <span className="text-gray-900">{formatMarketCap(crypto.marketCap)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default CryptoList