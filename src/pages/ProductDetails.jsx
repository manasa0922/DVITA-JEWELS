import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Breadcrumbs from '../components/Breadcrumbs.jsx'
import SmartImage from '../components/SmartImage.jsx'
import QuantitySelector from '../components/QuantitySelector.jsx'
import WishlistButton from '../components/WishlistButton.jsx'
import ProductGrid from '../components/ProductGrid.jsx'
import DemoNotice from '../components/DemoNotice.jsx'
import NotFound from './NotFound.jsx'
import { useCart } from '../context/CartContext.jsx'
import { getProductById, getRelatedProducts, getCategoryName } from '../services/productService.js'
import { formatINR } from '../utils/currency.js'
import { useDocumentTitle } from '../hooks/useDocumentTitle.js'

export default function ProductDetails() {
  const { id } = useParams()
  const product = getProductById(id)
  const [qty, setQty] = useState(1)
  const [active, setActive] = useState(0)
  const { addItem, maxQty } = useCart()
  useDocumentTitle(product?.name)
  useEffect(() => { setQty(1); setActive(0) }, [id])

  if (!product) return <NotFound message="We couldn't find that product." />

  return (
    <div className="container page-enter">
      <Breadcrumbs items={[
        { label: 'Home', to: '/' }, { label: 'Shop', to: '/shop' },
        { label: getCategoryName(product.category), to: `/shop?category=${product.category}` }, { label: product.name },
      ]} />
      <div className="pd">
        <div>
          <SmartImage src={product.images[active]} alt={product.name} className="pd__main" eager />
          {product.images.length > 1 && (
            <div className="pd__thumbs">
              {product.images.map((src, i) => (
                <button key={src} type="button" aria-current={i === active} aria-label={`Show image ${i + 1}`} onClick={() => setActive(i)}><SmartImage src={src} alt="" /></button>
              ))}
            </div>
          )}
        </div>
        <div>
          <span className="eyebrow">{getCategoryName(product.category)}</span>
          <h1 style={{ fontSize: 'clamp(2rem,4vw,3rem)' }}>{product.name}</h1>
          <div className="pd__price price">{formatINR(product.price)}{product.compareAt && <s>{formatINR(product.compareAt)}</s>}</div>
          <p>{product.description}</p>
          <p style={{ fontSize: '.85rem', color: product.inStock ? 'var(--success)' : 'var(--danger)' }}>{product.inStock ? 'Available (sample status)' : 'Sold out (sample status)'}</p>
          <div className="pd__buy">
            <QuantitySelector value={qty} onChange={setQty} max={maxQty} />
            <button type="button" className="btn btn--primary" disabled={!product.inStock} onClick={() => addItem(product.id, qty)}>Add to bag</button>
            <WishlistButton product={product} />
          </div>
          <DemoNotice>Sample product for demonstration. It is not available for purchase.</DemoNotice>
          <div className="accordion">
            <details open><summary>Product details</summary>
              <ul>{product.details.map((d) => <li key={d}>{d}</li>)}</ul>
            </details>
            <details><summary>Care instructions</summary>
              <ul>
                <li>Keep away from water, perfume and chemicals.</li>
                <li>Wipe gently with a soft dry cloth after wearing.</li>
                <li>Store separately in a pouch or box.</li>
              </ul>
            </details>
            <details><summary>Shipping &amp; returns</summary>
              <p style={{ marginTop: '.8rem' }}>See our <Link to="/shipping" className="link-underline">shipping</Link> and <Link to="/returns" className="link-underline">returns</Link> pages (sample text).</p>
            </details>
          </div>
        </div>
      </div>
      <section style={{ paddingBottom: 'var(--section-space)' }}>
        <div className="section-head"><h2>You may also like</h2></div>
        <ProductGrid products={getRelatedProducts(product)} four />
      </section>
    </div>
  )
}
