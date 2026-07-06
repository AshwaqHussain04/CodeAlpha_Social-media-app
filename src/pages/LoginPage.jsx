import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const { login } = useAuth()
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await login({ username: form.username, password: form.password })
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <h1>Sign in</h1>
        <p className="muted">Welcome back to Northstar.</p>
        <form className="auth-form" onSubmit={handleSubmit}>
          <input value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} placeholder="Username" />
          <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Password" />
          {error ? <p className="helper-text">{error}</p> : null}
          <button type="submit" className="primary-btn">Log in</button>
        </form>
        <p className="auth-switch">Need an account? <Link to="/signup">Create one</Link></p>
      </div>
    </div>
  )
}
