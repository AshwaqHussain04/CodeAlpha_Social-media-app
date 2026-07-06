import { NavLink } from 'react-router-dom'

export default function Navbar({ user }) {
  return (
    <aside className="sidebar">
      <div className="brand">Northstar</div>
      <nav className="nav-links">
        <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Home</NavLink>
        <NavLink to="/search" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Search</NavLink>
        <NavLink to="/settings" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Settings</NavLink>
        {user ? <NavLink to={`/profile/${user.username}`} className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Profile</NavLink> : null}
      </nav>
    </aside>
  )
}
