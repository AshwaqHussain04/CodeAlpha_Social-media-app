import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CommentThread from '../components/CommentThread'
import Navbar from '../components/Navbar'
import { useAuth } from '../context/AuthContext'

export default function PostDetailPage() {
  const { postId } = useParams()
  const { user } = useAuth()
  const [post, setPost] = useState(null)
  const [comments, setComments] = useState([])
  const [text, setText] = useState('')

  const loadPost = async () => {
    const [postRes, commentsRes] = await Promise.all([
      fetch(`/api/posts/${postId}`),
      fetch(`/api/comments/post/${postId}`),
    ])
    const postData = await postRes.json()
    const commentsData = await commentsRes.json()
    setPost(postData)
    setComments(commentsData)
  }

  useEffect(() => {
    loadPost()
  }, [postId])

  const handleComment = async (e) => {
    e.preventDefault()
    await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ postId, authorId: user?._id, text }),
    })
    setText('')
    loadPost()
  }

  if (!post) return null

  return (
    <div className="app-shell">
      <Navbar user={user} />
      <main className="main-column">
        <section className="page-card">
          <article className="post-card detail">
            <h3>{post.text}</h3>
            <p className="post-meta">By @{post.authorId?.username || 'user'}</p>
          </article>
          <form className="composer" onSubmit={handleComment}>
            <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Write a comment" rows={3} />
            <div className="composer-actions"><button className="primary-btn" type="submit">Comment</button></div>
          </form>
          <CommentThread comments={comments} />
        </section>
      </main>
      <aside className="right-rail" />
    </div>
  )
}
