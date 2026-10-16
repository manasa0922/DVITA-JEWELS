import { Link } from 'react-router-dom'
import CategoryCard from '../components/CategoryCard.jsx'
import Breadcrumbs from '../components/Breadcrumbs.jsx'
import { getCategories } from '../services/productService.js'
import { useDocumentTitle } from '../hooks/useDocumentTitle.js'

export default function Collections() {
  useDocumentTitle('Collections')
  return (
    <div className="container page-enter">
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Collections' }]} />
      <div className="page-title">
        <span className="eyebrow">Collections</span>
        <h1 style={{ fontSize: 'clamp(2.2rem,5vw,3.4rem)' }}>Explore by style</h1>
        <p style={{ maxWidth: 520, margin: '0 auto' }}>From everyday earrings to festive fusion sets: choose a collection to begin.</p>
      </div>
      <div className="category-grid" style={{ paddingBottom: '2rem' }}>
        {getCategories().map((c) => <CategoryCard key={c.id} category={c} />)}
      </div>
      <p style={{ textAlign: 'center', paddingBottom: 'var(--section-space)' }}><Link to="/shop" className="link-underline">View everything</Link></p>
    </div>
  )
}
