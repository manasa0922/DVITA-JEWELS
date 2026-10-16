import { Link, useNavigate } from 'react-router-dom'
import { X } from 'lucide-react'
import { useCart } from '../context/CartContext.jsx'
import { useOverlay } from '../hooks/useOverlay.js'
import { formatINR } from '../utils/currency.js'
import BagLine from './BagLine.jsx'

export default function CartDrawer() {
  const { items, subtotal, drawerOpen, closeDrawer } = useCart()
  const navigate = useNavigate()
  useOverlay(drawerOpen, closeDrawer)
  const go = (to) => { closeDrawer(); navigate(to) }

  return (
    <>
      <div className={`overlay ${drawerOpen ? 'open' : ''}`} onClick={closeDrawer} aria-hidden="true" />
      <aside className={`drawer drawer--right ${drawerOpen ? 'open' : ''}`} aria-label="Shopping bag" aria-hidden={!drawerOpen}>
        <div className="drawer-head">
          <h2>Your Bag</h2>
          <button type="button" className="icon-btn" onClick={closeDrawer} aria-label="Close bag"><X /></button>
        </div>
        <div className="drawer-body">
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 0' }}>
              <h3>Your bag is empty</h3>
              <p>Discover pieces made to be worn and loved.</p>
              <Link to="/shop" className="btn btn--outline" onClick={closeDrawer}>Continue shopping</Link>
            </div>
          ) : items.map((l) => <BagLine key={l.id} line={l} compact />)}
        </div>
        {items.length > 0 && (
          <div className="drawer-foot">
            <div className="summary-row"><span>Subtotal</span><strong>{formatINR(subtotal)}</strong></div>
            <p style={{ fontSize: '.8rem', color: 'var(--brown-soft)' }}>Shipping calculated at checkout (demo).</p>
            <button type="button" className="btn btn--primary btn--block" onClick={() => go('/checkout')}>Proceed to demo checkout</button>
            <button type="button" className="btn btn--outline btn--block" style={{ marginTop: '.6rem' }} onClick={() => go('/bag')}>View bag</button>
            <p style={{ textAlign: 'center', margin: '.8rem 0 0' }}><Link to="/shop" className="link-underline" onClick={closeDrawer}>Continue shopping</Link></p>
          </div>
        )}
      </aside>
    </>
  )
}
