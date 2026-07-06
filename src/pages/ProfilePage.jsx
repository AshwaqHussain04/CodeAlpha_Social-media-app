import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import PostCard from '../components/PostCard'
import { useAuth } from '../context/AuthContext'

export default function ProfilePage() {
  const { username } = useParams()
  const { user } = useAuth()
  const [profile, setProfile] = useState(null)
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const loadProfile = async () => {
      const res = await fetch(`/api/users/profile/${username}`)
      const data = await res.json()
      setProfile(data)
      const postsRes = await fetch(`/api/posts/user/${data._id}`)
      const postData = await postsRes.json()
      setPosts(postData)
    }

    loadProfile()
  }, [username])

  if (!profile) return null

  return (
    <div className="app-shell">
      <Navbar user={user} />
      <main className="main-column">
        <section className="page-card">
          <div className="profile-card">
            <div className="profile-top">
              <div className="avatar large">{profile.displayName?.slice(0, 2).toUpperCase() || 'U'}</div>
              <div className="profile-meta">
                <h2>{profile.displayName}</h2>
                <p className="muted">@{profile.username}</p>
                <p>{profile.bio || 'No bio yet.'}</p>
                <div className="stats-row">
                  <span>{profile.followerCount || 0} followers</span>
                  <span>{profile.followingCount || 0} following</span>
                </div>
              </div>
            </div>
          </div>
          {posts.map((post) => <PostCard key={post._id} post={post} />)}
        </section>
      </main>
      <aside className="right-rail" />
    </div>
  )
}
