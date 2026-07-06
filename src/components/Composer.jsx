import { useState } from 'react'

export default function Composer({ onSubmit, placeholder = 'What is happening?' }) {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!text.trim()) return
    setLoading(true)
    await onSubmit(text.trim())
    setText('')
    setLoading(false)
  }

  return (
    <form className="composer" onSubmit={handleSubmit}>
      <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder={placeholder} rows={3} />
      <div className="composer-actions">
        <button type="submit" className="primary-btn" disabled={loading}>{loading ? 'Posting…' : 'Post'}</button>
      </div>
    </form>
  )
}
