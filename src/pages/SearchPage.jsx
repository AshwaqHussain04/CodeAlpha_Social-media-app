import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import PostCard from '../components/PostCard'
import { useAuth } from '../context/AuthContext'

export default function SearchPage() {
  const { user } = useAuth()
  const [query, setQuery] = useState('')
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (!query.trim()) {
        setPosts([])
        return
      }
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
      const data = await res.json()
      setPosts(data)
    }, 300)

    return () => clearTimeout(timer)
  }, [query])

  return (
    <div className="app-shell">
      <Navbar user={user} />
      <main className="main-column">
        <section className="page-card">
          <div className="search-box">
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search posts" />
          </div>
          {posts.map((post) => <PostCard key={post._id} post={post} />)}
        </section>
      </main>
      <aside className="right-rail" />
    </div>
  )
}
