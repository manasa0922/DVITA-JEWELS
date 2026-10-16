import { Heart } from 'lucide-react'
import { useWishlist } from '../context/WishlistContext.jsx'

export default function WishlistButton({ product, className = '' }) {
  const { has, toggle } = useWishlist()
  const active = has(product.id)
  return (
    <button
      type="button"
      className={`wish-btn ${active ? 'active' : ''} ${className}`}
      aria-pressed={active}
      aria-label={active ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
      onClick={() => toggle(product.id)}
    >
      <Heart size={20} strokeWidth={1.5} />
    </button>
  )
}
