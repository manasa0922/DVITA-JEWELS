// The only place the UI reads product data from.
// Later, replace these with fetch() calls to a FastAPI backend; components stay unchanged.
import { products } from '../data/products.js'
import { categories } from '../data/categories.js'

export const getProducts = () => products
export const getProductById = (id) => products.find((p) => p.id === id)
export const getCategories = () => categories
export const getCategoryName = (id) => categories.find((c) => c.id === id)?.name ?? id
export const getRelatedProducts = (product, limit = 4) => {
  const same = products.filter((p) => p.category === product.category && p.id !== product.id)
  const others = products.filter((p) => p.category !== product.category && p.id !== product.id)
  return [...same, ...others].slice(0, limit)
}
