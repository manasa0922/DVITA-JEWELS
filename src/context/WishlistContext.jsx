import { createContext, useCallback, useContext, useMemo } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage.js'
import { getProductById } from '../services/productService.js'

const WishlistContext = createContext(null)

export function WishlistProvider({ children }) {
  const [ids, setIds] = useLocalStorage('dvita_wishlist', [])
  const toggle = useCallback(
    (id) => setIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])),
    [setIds]
  )
  const value = useMemo(
    () => ({
      ids,
      items: ids.map(getProductById).filter(Boolean),
      count: ids.length,
      has: (id) => ids.includes(id),
      toggle,
    }),
    [ids, toggle]
  )
  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}

export const useWishlist = () => useContext(WishlistContext)
