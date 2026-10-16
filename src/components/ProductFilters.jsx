import { Search } from 'lucide-react'
import { getCategories } from '../services/productService.js'

export default function ProductFilters({ filters, setFilter, onReset, resultCount }) {
  const categories = getCategories()
  return (
    <div className="filters">
      <div className="field">
        <label htmlFor="filter-search">Search by name</label>
        <div className="filters__search">
          <Search size={16} aria-hidden="true" />
          <input id="filter-search" type="search" value={filters.q} placeholder="Search products" onChange={(e) => setFilter('q', e.target.value)} />
        </div>
      </div>
      <fieldset className="filters__cats">
        <legend>Category</legend>
        <button type="button" className={!filters.category ? 'chip active' : 'chip'} aria-pressed={!filters.category} onClick={() => setFilter('category', '')}>All</button>
        {categories.map((c) => (
          <button key={c.id} type="button" className={filters.category === c.id ? 'chip active' : 'chip'} aria-pressed={filters.category === c.id} onClick={() => setFilter('category', c.id)}>{c.name}</button>
        ))}
      </fieldset>
      <div className="field">
        <label htmlFor="filter-sort">Sort by</label>
        <select id="filter-sort" value={filters.sort} onChange={(e) => setFilter('sort', e.target.value)}>
          <option value="popular">Popularity</option>
          <option value="newest">Newest</option>
          <option value="price-asc">Price: low to high</option>
          <option value="price-desc">Price: high to low</option>
        </select>
      </div>
      <div className="filters__foot">
        <span aria-live="polite">{resultCount} {resultCount === 1 ? 'piece' : 'pieces'}</span>
        <button type="button" className="link-underline" onClick={onReset}>Reset</button>
      </div>
    </div>
  )
}
