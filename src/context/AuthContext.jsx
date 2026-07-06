import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const url = "http://localhost:5000";
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem('northstar-user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = async (payload) => {
    const res = await fetch(`${url}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    const data = await res.json()
    if (!res.ok) throw new Error(data.error || 'Login failed')

    localStorage.setItem('northstar-user', JSON.stringify(data.user))
    setUser(data.user)
    return data
  }

  const signup = async (payload) => {
    const res = await fetch(`${url}/api/auth/signupuser`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    const data = await res.json()
    if (!res.ok) throw new Error(data.error || 'Signup failed')

    localStorage.setItem('northstar-user', JSON.stringify(data.user))
    setUser(data.user)
    return data
  }

  const logout = async () => {
    localStorage.removeItem('northstar-user')
    setUser(null)
  }

  const value = useMemo(() => ({ user, loading, login, signup, logout }), [user, loading])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
