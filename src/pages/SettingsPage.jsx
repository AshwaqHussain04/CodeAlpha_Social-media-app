import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useAuth } from '../context/AuthContext'

export default function SettingsPage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ displayName: user?.displayName || '', bio: user?.bio || '' })

  const handleSave = async (e) => {
    e.preventDefault()
    await fetch(`/api/users/${user._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
  }

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <div className="app-shell">
      <Navbar user={user} />
      <main className="main-column">
        <section className="page-card">
          <h2>Settings</h2>
          <form className="auth-form" onSubmit={handleSave}>
            <input value={form.displayName} onChange={(e) => setForm({ ...form, displayName: e.target.value })} placeholder="Display name" />
            <textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} placeholder="Bio" rows={4} />
            <button type="submit" className="primary-btn">Save</button>
          </form>
          <button type="button" className="secondary-btn" onClick={handleLogout}>Log out</button>
        </section>
      </main>
      <aside className="right-rail" />
    </div>
  )
}
