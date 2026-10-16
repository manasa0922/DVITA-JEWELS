import { Link } from 'react-router-dom'
import SmartImage from './SmartImage.jsx'
import QuantitySelector from './QuantitySelector.jsx'
import { useCart } from '../context/CartContext.jsx'
import { formatINR } from '../utils/currency.js'

export default function BagLine({ line }) {
  const { setQty, removeItem, maxQty } = useCart()
  const { product, qty } = line
  return (
    <div className="bag-line">
      <Link to={`/product/${product.id}`}><SmartImage src={product.images[0]} alt={product.name} /></Link>
      <div>
        <h3><Link to={`/product/${product.id}`}>{product.name}</Link></h3>
        <div className="price">{formatINR(product.price)}</div>
        <div className="bag-line__row">
          <QuantitySelector value={qty} onChange={(n) => setQty(product.id, n)} max={maxQty} label={`Quantity for ${product.name}`} />
          <strong>{formatINR(product.price * qty)}</strong>
        </div>
        <button type="button" className="remove-btn" onClick={() => removeItem(product.id)} aria-label={`Remove ${product.name} from bag`}>Remove</button>
      </div>
    </div>
  )
}
