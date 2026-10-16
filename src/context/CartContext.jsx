import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage.js'
import { getProductById } from '../services/productService.js'
import { siteConfig } from '../data/siteConfig.js'

const CartContext = createContext(null)
const MAX_QTY = 10

export function CartProvider({ children }) {
  // Only ids and quantities are stored; product info is looked up fresh from the data file.
  const [lines, setLines] = useLocalStorage('dvita_bag', [])
  const [drawerOpen, setDrawerOpen] = useState(false)

  const addItem = useCallback((id, qty = 1) => {
    setLines((prev) => {
      const found = prev.find((l) => l.id === id)
      if (found) return prev.map((l) => (l.id === id ? { ...l, qty: Math.min(MAX_QTY, l.qty + qty) } : l))
      return [...prev, { id, qty: Math.min(MAX_QTY, qty) }]
    })
    setDrawerOpen(true)
  }, [setLines])

  const setQty = useCallback((id, qty) => {
    setLines((prev) =>
      qty < 1 ? prev.filter((l) => l.id !== id) : prev.map((l) => (l.id === id ? { ...l, qty: Math.min(MAX_QTY, qty) } : l))
    )
  }, [setLines])

  const removeItem = useCallback((id) => setLines((prev) => prev.filter((l) => l.id !== id)), [setLines])
  const clearBag = useCallback(() => setLines([]), [setLines])

  const value = useMemo(() => {
    const items = lines
      .map((l) => ({ ...l, product: getProductById(l.id) }))
      .filter((l) => l.product)
    const count = items.reduce((n, l) => n + l.qty, 0)
    const subtotal = items.reduce((n, l) => n + l.qty * l.product.price, 0)
    const shipping = items.length === 0 || subtotal >= siteConfig.freeShippingThreshold ? 0 : siteConfig.flatShipping
    return {
      items, count, subtotal, shipping, total: subtotal + shipping, maxQty: MAX_QTY,
      addItem, setQty, removeItem, clearBag,
      drawerOpen, openDrawer: () => setDrawerOpen(true), closeDrawer: () => setDrawerOpen(false),
    }
  }, [lines, drawerOpen, addItem, setQty, removeItem, clearBag])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => useContext(CartContext)
