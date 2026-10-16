import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SlidersHorizontal } from 'lucide-react'
import Breadcrumbs from '../components/Breadcrumbs.jsx'
import ProductFilters from '../components/ProductFilters.jsx'
import ProductGrid from '../components/ProductGrid.jsx'
import QuickView from '../components/QuickView.jsx'
import { getProducts, getCategoryName } from '../services/productService.js'
import { useDocumentTitle } from '../hooks/useDocumentTitle.js'

const sorters = {
  popular: (a, b) => b.popularity - a.popularity,
  newest: (a, b) => Number(b.isNew) - Number(a.isNew) || b.id.localeCompare(a.id),
  'price-asc': (a, b) => a.price - b.price,
  'price-desc': (a, b) => b.price - a.price,
}

export default function Shop() {
  const [params, setParams] = useSearchParams()
  const [quick, setQuick] = useState(null)
  const [filtersOpen, setFiltersOpen] = useState(false)
  // Search text lives in local state so typing is never delayed by URL updates.
  const [text, setText] = useState(params.get('q') ?? '')
  const filters = { q: text, category: params.get('category') ?? '', sort: params.get('sort') ?? 'popular' }
  useDocumentTitle(filters.category ? getCategoryName(filters.category) : 'Shop')

  const setFilter = (key, value) => {
    if (key === 'q') setText(value)
    const next = new URLSearchParams(params)
    if (value && !(key === 'sort' && value === 'popular')) next.set(key, value)
    else next.delete(key)
    setParams(next, { replace: true })
  }

  const reset = () => { setText(''); setParams({}, { replace: true }) }

  const results = useMemo(() => {
    const term = filters.q.trim().toLowerCase()
    return getProducts()
      .filter((p) => (!filters.category || p.category === filters.category) && (!term || p.name.toLowerCase().includes(term)))
      .sort(sorters[filters.sort] ?? sorters.popular)
  }, [filters.q, filters.category, filters.sort])

  return (
    <div className="container page-enter">
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Shop' }]} />
      <div className="page-title">
        <span className="eyebrow">The collection</span>
        <h1 style={{ fontSize: 'clamp(2.2rem,5vw,3.4rem)' }}>{filters.category ? getCategoryName(filters.category) : 'All jewellery'}</h1>
      </div>
      <div className="shop-layout">
        <div className={`filters-wrap ${filtersOpen ? 'open' : ''}`}>
          <button type="button" className="btn btn--outline filters-toggle" onClick={() => setFiltersOpen((o) => !o)} aria-expanded={filtersOpen}>
            <SlidersHorizontal size={16} /> Filters &amp; sort
          </button>
          <ProductFilters filters={filters} setFilter={setFilter} onReset={reset} resultCount={results.length} />
        </div>
        <div>
          {results.length === 0 ? (
            <div className="empty">
              <h2>No pieces found</h2>
              <p>Try a different search or category.</p>
              <button type="button" className="btn btn--outline" onClick={reset}>Clear filters</button>
            </div>
          ) : <ProductGrid products={results} onQuickView={setQuick} />}
        </div>
      </div>
      {quick && <QuickView product={quick} onClose={() => setQuick(null)} />}
    </div>
  )
}
