import ProductCard from './ProductCard.jsx'
export default function ProductGrid({ products, onQuickView, four = false }) {
  return (
    <div className={`product-grid ${four ? 'product-grid--4' : ''}`}>
      {products.map((p) => <ProductCard key={p.id} product={p} onQuickView={onQuickView} />)}
    </div>
  )
}
