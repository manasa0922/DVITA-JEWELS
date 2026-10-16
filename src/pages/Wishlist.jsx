import { Link } from 'react-router-dom'
import Breadcrumbs from '../components/Breadcrumbs.jsx'
import ProductGrid from '../components/ProductGrid.jsx'
import { useWishlist } from '../context/WishlistContext.jsx'
import { useCart } from '../context/CartContext.jsx'
import { useDocumentTitle } from '../hooks/useDocumentTitle.js'

export default function Wishlist() {
  const { items } = useWishlist()
  const { addItem } = useCart()
  useDocumentTitle('Wishlist')
  const addAll = () => items.filter((p) => p.inStock).forEach((p) => addItem(p.id))
  return (
    <div className="container page-enter">
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Wishlist' }]} />
      <div className="page-title"><h1 style={{ fontSize: 'clamp(2.2rem,5vw,3.4rem)' }}>Your wishlist</h1></div>
      <div style={{ paddingBottom: 'var(--section-space)' }}>
        {items.length === 0 ? (
          <div className="empty">
            <h2>No saved pieces yet</h2>
            <p>Tap the heart on any piece to save it here.</p>
            <Link to="/shop" className="btn btn--outline">Browse jewellery</Link>
          </div>
        ) : (
          <>
            <p style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <button type="button" className="btn btn--outline" onClick={addAll}>Add all available to bag</button>
            </p>
            <ProductGrid products={items} four />
          </>
        )}
      </div>
    </div>
  )
}
