import { Link } from 'react-router-dom'
import { X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import SmartImage from './SmartImage.jsx'
import QuantitySelector from './QuantitySelector.jsx'
import WishlistButton from './WishlistButton.jsx'
import { useCart } from '../context/CartContext.jsx'
import { useOverlay } from '../hooks/useOverlay.js'
import { formatINR } from '../utils/currency.js'

export default function QuickView({ product, onClose }) {
  const [qty, setQty] = useState(1)
  const { addItem, maxQty } = useCart()
  const closeRef = useRef(null)
  useOverlay(true, onClose)
  useEffect(() => { closeRef.current?.focus() }, [])

  return (
    <div className="modal" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal__box" role="dialog" aria-modal="true" aria-label={`Quick view: ${product.name}`}>
        <button ref={closeRef} type="button" className="icon-btn modal__close" onClick={onClose} aria-label="Close quick view"><X /></button>
        <SmartImage src={product.images[0]} alt={product.name} eager />
        <div className="modal__body">
          <h2 style={{ fontSize: '2rem' }}>{product.name}</h2>
          <p className="price" style={{ fontSize: '1.2rem' }}>
            {formatINR(product.price)}{product.compareAt && <s>{formatINR(product.compareAt)}</s>}
          </p>
          <p>{product.description}</p>
          <div style={{ display: 'flex', gap: '.75rem', alignItems: 'center', margin: '1.25rem 0' }}>
            <QuantitySelector value={qty} onChange={setQty} max={maxQty} />
            <WishlistButton product={product} />
          </div>
          <button type="button" className="btn btn--primary btn--block" disabled={!product.inStock}
            onClick={() => { addItem(product.id, qty); onClose() }}>
            {product.inStock ? 'Add to bag' : 'Unavailable (sample)'}
          </button>
          <p style={{ marginTop: '1rem' }}><Link className="link-underline" to={`/product/${product.id}`} onClick={onClose}>View full details</Link></p>
        </div>
      </div>
    </div>
  )
}
