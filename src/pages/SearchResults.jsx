import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import ProductGrid from '../components/ProductGrid.jsx'
import QuickView from '../components/QuickView.jsx'
import Breadcrumbs from '../components/Breadcrumbs.jsx'
import { getProducts, getCategoryName } from '../services/productService.js'
import { useDocumentTitle } from '../hooks/useDocumentTitle.js'

export default function SearchResults() {
  const [params] = useSearchParams()
  const [quick, setQuick] = useState(null)
  const q = (params.get('q') ?? '').trim()
  useDocumentTitle(q ? `Search: ${q}` : 'Search')
  const term = q.toLowerCase()
  const results = term
    ? getProducts().filter((p) => `${p.name} ${getCategoryName(p.category)} ${p.description}`.toLowerCase().includes(term))
    : []

  return (
    <div className="container page-enter">
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Search' }]} />
      <div className="page-title">
        <h1 style={{ fontSize: 'clamp(2rem,5vw,3rem)' }}>{q ? `Results for “${q}”` : 'Search'}</h1>
        {q && <p aria-live="polite">{results.length} {results.length === 1 ? 'piece' : 'pieces'} found</p>}
      </div>
      <div style={{ paddingBottom: 'var(--section-space)' }}>
        {results.length > 0 ? <ProductGrid products={results} onQuickView={setQuick} /> : (
          <div className="empty">
            <h2>{q ? 'Nothing matched your search' : 'What are you looking for?'}</h2>
            <p>{q ? 'Check the spelling or browse our full collection.' : 'Use the search icon in the header to find a piece.'}</p>
            <Link to="/shop" className="btn btn--outline">Browse all jewellery</Link>
          </div>
        )}
      </div>
      {quick && <QuickView product={quick} onClose={() => setQuick(null)} />}
    </div>
  )
}
