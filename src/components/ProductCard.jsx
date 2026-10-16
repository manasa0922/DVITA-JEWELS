import { Link } from 'react-router-dom'
import SmartImage from './SmartImage.jsx'
import WishlistButton from './WishlistButton.jsx'
import { useCart } from '../context/CartContext.jsx'
import { formatINR } from '../utils/currency.js'
import { getCategoryName } from '../services/productService.js'

export default function ProductCard({ product, onQuickView }) {
  const { addItem } = useCart()
  return (
    <article className="product-card">
      <div className="product-card__media">
        <Link to={`/product/${product.id}`} aria-label={`View ${product.name}`} tabIndex={-1}>
          <SmartImage src={product.images[0]} alt={product.name} className="" />
        </Link>
        <div className="product-card__tags">
          {product.isNew && <span className="tag tag--dark">New</span>}
          {product.bestseller && <span className="tag">Bestseller</span>}
          {!product.inStock && <span className="tag">Sold out (sample)</span>}
        </div>
        <WishlistButton product={product} />
        <div className="product-card__actions">
          {onQuickView && <button type="button" onClick={() => onQuickView(product)}>Quick view</button>}
          <button type="button" disabled={!product.inStock} onClick={() => addItem(product.id)}>
            {product.inStock ? 'Add to bag' : 'Unavailable'}
          </button>
        </div>
      </div>
      <div className="product-card__info">
        <div className="product-card__cat">{getCategoryName(product.category)}</div>
        <h3 className="product-card__name"><Link to={`/product/${product.id}`}>{product.name}</Link></h3>
        <div className="price">
          {formatINR(product.price)}
          {product.compareAt && <s aria-label={`Sample comparison price ${formatINR(product.compareAt)}`}>{formatINR(product.compareAt)}</s>}
        </div>
      </div>
    </article>
  )
}
