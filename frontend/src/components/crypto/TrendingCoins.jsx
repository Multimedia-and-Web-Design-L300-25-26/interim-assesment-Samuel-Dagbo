import { Link } from 'react-router-dom'

function TrendingCoins({ coins, title = 'Trending Coins' }) {
  const formatPrice = (price) => {
    if (price >= 1000) return `$${price.toLocaleString(undefined, { maximumFractionDigits: 2 })}`
    if (price >= 1) return `$${price.toFixed(2)}`
    return `$${price.toFixed(6)}`
  }

  return (
    <section className="bg-gray-50 py-8 border-y">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {coins.map((coin) => (
            <Link
              key={coin.id}
              to="/cryptos"
              className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all border border-gray-100"
            >
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
                  {coin.icon}
                </div>
                <div className="ml-2">
                  <div className="font-semibold text-gray-900 text-sm">{coin.symbol}</div>
                  <div className="text-xs text-gray-500">{coin.name}</div>
                </div>
              </div>
              <div className="text-sm font-medium text-gray-900">{formatPrice(coin.price)}</div>
              <div className={`text-sm ${coin.change24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {coin.change24h >= 0 ? '+' : ''}{coin.change24h.toFixed(2)}%
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TrendingCoins