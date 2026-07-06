import { useState } from 'react'

export default function CommentThread({ comments = [] }) {
  const [expanded, setExpanded] = useState(false)
  if (!comments.length) return null

  return (
    <div className="comment-thread">
      {comments.map((comment) => (
        <div key={comment._id} className="comment-item">
          <div className="comment-head">
            <div className="avatar small">{comment.authorId?.displayName?.slice(0, 2).toUpperCase() || 'U'}</div>
            <div>
              <p className="post-author">{comment.authorId?.displayName || 'User'}</p>
              <p className="post-meta">{new Date(comment.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
          <p className="comment-text">{comment.text}</p>
        </div>
      ))}
      <button type="button" className="text-btn" onClick={() => setExpanded((v) => !v)}>{expanded ? 'Hide' : 'Show more'}</button>
    </div>
  )
}
