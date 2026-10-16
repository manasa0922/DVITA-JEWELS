import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, X } from 'lucide-react'

// Slide-down search panel used by the header.
export default function SearchBar({ open, onClose }) {
  const [q, setQ] = useState('')
  const ref = useRef(null)
  const navigate = useNavigate()
  useEffect(() => { if (open) ref.current?.focus() }, [open])
  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const submit = (e) => {
    e.preventDefault()
    const term = q.trim()
    if (!term) return
    navigate(`/search?q=${encodeURIComponent(term)}`)
    onClose()
  }

  if (!open) return null
  return (
    <div className="search-panel" role="search">
      <form className="container search-panel__form" onSubmit={submit}>
        <Search size={20} aria-hidden="true" />
        <label htmlFor="site-search" className="sr-only">Search products</label>
        <input id="site-search" ref={ref} type="search" placeholder="Search jewellery, e.g. jhumka" value={q} onChange={(e) => setQ(e.target.value)} />
        <button type="submit" className="link-underline">Search</button>
        <button type="button" className="icon-btn" onClick={onClose} aria-label="Close search"><X size={20} /></button>
      </form>
    </div>
  )
}
