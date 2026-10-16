import { Link } from 'react-router-dom'
import Breadcrumbs from '../components/Breadcrumbs.jsx'
import BagLine from '../components/BagLine.jsx'
import { useCart } from '../context/CartContext.jsx'
import { formatINR } from '../utils/currency.js'
import { siteConfig } from '../data/siteConfig.js'
import { useDocumentTitle } from '../hooks/useDocumentTitle.js'

export function OrderSummary({ cta }) {
  const { subtotal, shipping, total } = useCart()
  return (
    <div className="summary-box">
      <h2 style={{ fontSize: '1.6rem' }}>Order summary</h2>
      <div className="summary-row"><span>Subtotal</span><span>{formatINR(subtotal)}</span></div>
      <div className="summary-row"><span>Shipping</span><span>{shipping === 0 ? 'Free' : formatINR(shipping)}</span></div>
      {shipping > 0 && <p style={{ fontSize: '.8rem', color: 'var(--brown-soft)' }}>Free shipping above {formatINR(siteConfig.freeShippingThreshold)}.</p>}
      <div className="summary-row summary-row--total"><span>Total</span><span>{formatINR(total)}</span></div>
      {cta}
    </div>
  )
}

export default function ShoppingBag() {
  const { items, clearBag } = useCart()
  useDocumentTitle('Shopping bag')
  return (
    <div className="container page-enter">
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Shopping bag' }]} />
      <div className="page-title"><h1 style={{ fontSize: 'clamp(2.2rem,5vw,3.4rem)' }}>Your bag</h1></div>
      {items.length === 0 ? (
        <div className="empty" style={{ marginBottom: 'var(--section-space)' }}>
          <h2>Your bag is empty</h2>
          <p>Add a piece you love to get started.</p>
          <Link to="/shop" className="btn btn--outline">Continue shopping</Link>
        </div>
      ) : (
        <div className="two-col">
          <div>
            {items.map((l) => <BagLine key={l.id} line={l} />)}
            <p style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
              <Link to="/shop" className="link-underline">Continue shopping</Link>
              <button type="button" className="remove-btn" onClick={clearBag}>Empty bag</button>
            </p>
          </div>
          <OrderSummary cta={<Link to="/checkout" className="btn btn--primary btn--block" style={{ marginTop: '1rem' }}>Proceed to demo checkout</Link>} />
        </div>
      )}
    </div>
  )
}
