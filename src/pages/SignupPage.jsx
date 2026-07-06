import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function SignupPage() {
  const { signup } = useAuth()
  const [form, setForm] = useState({ username: '', email: '', displayName: '', password: '' })
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await signup(form)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <h1>Create account</h1>
        <p className="muted">Join the conversation.</p>
        <form className="auth-form" onSubmit={handleSubmit}>
          <input value={form.displayName} onChange={(e) => setForm({ ...form, displayName: e.target.value })} placeholder="Display name" />
          <input value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} placeholder="Username" />
          <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" />
          <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Password" />
          {error ? <p className="helper-text">{error}</p> : null}
          <button type="submit" className="primary-btn">Sign up</button>
        </form>
        <p className="auth-switch">Already have an account? <Link to="/login">Log in</Link></p>
      </div>
    </div>
  )
}
