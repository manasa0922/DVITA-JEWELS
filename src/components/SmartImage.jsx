import { useState } from 'react'

// Image with a fixed container (set aspect-ratio via the parent/className),
// lazy loading, and a branded fallback if the URL fails.
export default function SmartImage({ src, alt, className = '', eager = false, label = 'DJ' }) {
  const [failed, setFailed] = useState(false)
  if (!src || failed) {
    return (
      <div className={`smart-img fallback ${className}`} role="img" aria-label={alt}>
        <div>
          {label}
          <small>Image coming soon</small>
        </div>
      </div>
    )
  }
  return (
    <div className={`smart-img ${className}`}>
      <img src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" onError={() => setFailed(true)} />
    </div>
  )
}
