import { Link } from 'react-router-dom'

export default function PostCard({ post, onLike }) {
  const author = post.authorId || {}
  return (
    <article className="post-card">
      <div className="post-header">
        <div className="avatar">{(author.displayName || author.username || 'U').slice(0, 2).toUpperCase()}</div>
        <div>
          <Link to={`/profile/${author.username}`} className="post-author">{author.displayName || author.username}</Link>
          <p className="post-meta">@{author.username || 'unknown'} · {new Date(post.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
      <Link to={`/post/${post._id}`} className="post-body">
        <p>{post.text}</p>
      </Link>
      <div className="post-footer">
        <button type="button" className="icon-btn" onClick={() => onLike?.(post._id)}>♥ {post.likeCount || 0}</button>
        <Link to={`/post/${post._id}`} className="icon-btn">💬 {post.commentCount || 0}</Link>
      </div>
    </article>
  )
}
