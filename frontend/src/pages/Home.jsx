import { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import Hero from "../components/layout/Hero"
import HowItWorks from "../components/layout/HowItWorks"
import { fetchCryptos, fetchGainers } from "../utils/api"
import CryptoRow from "../components/crypto/cryptoRow.jsx"
import { FaChartLine, FaShieldAlt, FaMobileAlt, FaWallet, FaGlobe, FaAward } from "react-icons/fa"

function Home() {
  const [cryptos, setCryptos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadCryptos()
  }, [])

  const loadCryptos = async () => {
    try {
      const res = await fetchCryptos()
      setCryptos(res.data.slice(0, 5))
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
    <div className="min-h-screen bg-white">
      <Hero />

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Why choose our platform?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="rounded-xl p-6 border border-gray-100 hover:border-blue-200 transition-colors">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                <FaShieldAlt className="text-2xl text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure & Trusted</h3>
              <p className="text-gray-600">
                Your crypto is protected by industry-leading security measures.
              </p>
            </div>

            <div className="rounded-xl p-6 border border-gray-100 hover:border-green-200 transition-colors">
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center mb-4">
                <FaChartLine className="text-2xl text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Real-time Trading</h3>
              <p className="text-gray-600">
                Get access to real-time market data and trade instantly.
              </p>
            </div>

            <div className="rounded-xl p-6 border border-gray-100 hover:border-purple-200 transition-colors">
              <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center mb-4">
                <FaMobileAlt className="text-2xl text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Mobile First</h3>
              <p className="text-gray-600">
                Trade anywhere, anytime with our powerful apps.
              </p>
            </div>
          </div>
        </div>
      </section>

      <HowItWorks />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Top Cryptocurrencies
          </h2>
          <Link 
            to="/explore" 
            className="text-[#0052FF] hover:text-blue-700 font-medium"
          >
            See all
          </Link>
        </div>
        
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : (
          <div className="bg-gray-50 rounded-xl overflow-hidden">
            {cryptos.map((coin) => (
              <div key={coin._id} className="flex items-center justify-between p-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#0052FF] flex items-center justify-center text-white font-bold">
                    {coin.symbol.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{coin.symbol}</div>
                    <div className="text-sm text-gray-500">{coin.name}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-gray-900">{formatPrice(coin.price)}</div>
                  <div className={`text-sm ${coin.change24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {coin.change24h >= 0 ? '+' : ''}{coin.change24h.toFixed(2)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="bg-[#0052FF] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Start your crypto journey today
          </h2>
          <p className="text-blue-100 text-lg mb-8">
            Join millions of users who trust our platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-white text-[#0052FF] font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Create Account
            </Link>
            <Link
              to="/explore"
              className="bg-transparent border-2 border-white text-white font-semibold px-8 py-4 rounded-lg hover:bg-white/10 transition-colors"
            >
              Explore Crypto
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home