import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import Composer from '../components/Composer'
import Navbar from '../components/Navbar'
import PostCard from '../components/PostCard'

export default function HomePage() {
  const { user } = useAuth()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  const loadFeed = async () => {
    setLoading(true)
    const res = await fetch(`/api/posts/feed/${user?._id || ''}`)
    const data = await res.json()
    setPosts(data)
    setLoading(false)
  }

  useEffect(() => {
    if (user) loadFeed()
  }, [user])

  const handleCreatePost = async (text) => {
    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ authorId: user?._id, text }),
    })
    if (res.ok) loadFeed()
  }

  const handleLike = async (postId) => {
    await fetch('/api/likes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user?._id, targetId: postId, targetType: 'post' }),
    })
    loadFeed()
  }

  return (
    <div className="app-shell">
      <Navbar user={user} />
      <main className="main-column">
        <section className="page-card">
          <Composer onSubmit={handleCreatePost} />
          {loading ? <p className="muted">Loading...</p> : posts.map((post) => <PostCard key={post._id} post={post} onLike={handleLike} />)}
        </section>
      </main>
      <aside className="right-rail" />
    </div>
  )
}
