import { createContext, useState, useEffect } from 'react'
import axios from 'axios'

export const AuthContext = createContext()

const API_URL = import.meta.env.VITE_API_URL || '/api'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      fetchProfile()
    } else {
      setLoading(false)
    }
  }, [token])

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`${API_URL}/auth/profile`)
      setUser(res.data.user)
      setLoading(false)
    } catch (err) {
      console.error('Fetch profile error:', err)
      if (err.response?.status === 401 || err.response?.status === 403) {
        localStorage.removeItem('token')
        setToken(null)
      }
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    const res = await axios.post(`${API_URL}/auth/login`, { email, password })
    const { token, user } = res.data
    localStorage.setItem('token', token)
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    setToken(token)
    setUser(user)
    setLoading(false)
    return user
  }

  const register = async (name, email, password) => {
    const res = await axios.post(`${API_URL}/auth/register`, { name, email, password })
    const { token, user } = res.data
    localStorage.setItem('token', token)
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    setToken(token)
    setUser(user)
    setLoading(false)
    return user
  }

  const buyCrypto = async (symbol, amount) => {
    const res = await axios.post(`${API_URL}/auth/buy`, { symbol, amount })
    setUser(prev => ({ ...prev, balance: res.data.balance, holdings: res.data.holdings }))
    return res.data
  }

  const sellCrypto = async (symbol, amount) => {
    const res = await axios.post(`${API_URL}/auth/sell`, { symbol, amount })
    setUser(prev => ({ ...prev, balance: res.data.balance, holdings: res.data.holdings }))
    return res.data
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
    delete axios.defaults.headers.common['Authorization']
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, buyCrypto, sellCrypto }}>
      {children}
    </AuthContext.Provider>
  )
}