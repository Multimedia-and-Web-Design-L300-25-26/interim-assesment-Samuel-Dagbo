import { Link } from 'react-router-dom'

function CryptoRow({ coin }) {
  const formatPrice = (price) => {
    if (price >= 1000) return `$${price.toLocaleString(undefined, { maximumFractionDigits: 2 })}`
    if (price >= 1) return `$${price.toFixed(2)}`
    return `$${price.toFixed(6)}`
  }

  const formatMarketCap = (cap) => {
    if (cap >= 1e12) return `$${(cap / 1e12).toFixed(2)}T`
    if (cap >= 1e9) return `$${(cap / 1e9).toFixed(2)}B`
    return `$${(cap / 1e6).toFixed(2)}M`
  }

  return (
    <div className="grid grid-cols-4 lg:grid-cols-5 gap-4 items-center px-6 py-4 border-b hover:bg-gray-50 transition-colors">
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
          {coin.icon}
        </div>
        <div className="ml-3">
          <div className="font-semibold text-gray-900">{coin.name}</div>
          <div className="text-sm text-gray-500">{coin.symbol}</div>
        </div>
      </div>
      <div className="text-right font-medium text-gray-900">
        {formatPrice(coin.price)}
      </div>
      <div className={`text-left ${coin.change24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
        {coin.change24h >= 0 ? '+' : ''}{coin.change24h.toFixed(2)}%
      </div>
      <div className="text-right hidden md:block text-gray-500">
        {formatMarketCap(coin.marketCap)}
      </div>
      <div className="text-right hidden lg:block">
        <Link
          to="/cryptos"
          className="text-blue-600 hover:text-blue-700 font-medium text-sm"
        >
          Trade
        </Link>
      </div>
    </div>
  )
}

export default CryptoRow