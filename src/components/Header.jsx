import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Heart, Menu, Search, ShoppingBag } from 'lucide-react'
import { navLinks } from '../data/navigation.js'
import { useCart } from '../context/CartContext.jsx'
import { useWishlist } from '../context/WishlistContext.jsx'
import MobileMenu from './MobileMenu.jsx'
import SearchBar from './SearchBar.jsx'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const { count, openDrawer } = useCart()
  const wishlist = useWishlist()

  return (
    <>
    <header className="site-header">
      <div className="container header-inner">
        <button type="button" className="icon-btn menu-toggle" onClick={() => setMenuOpen(true)} aria-label="Open menu" aria-expanded={menuOpen}><Menu /></button>
        <nav className="nav-desktop" aria-label="Main">
          {navLinks.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'} className={({ isActive }) => (isActive ? 'active' : '')}>{l.label}</NavLink>
          ))}
        </nav>
        <Link to="/" className="logo" aria-label="DVITA JEWELS home">DVITA <span>JEWELS</span></Link>
        <div className="header-actions">
          <button type="button" className="icon-btn" onClick={() => setSearchOpen((s) => !s)} aria-label="Search" aria-expanded={searchOpen}><Search size={21} strokeWidth={1.5} /></button>
          <Link to="/wishlist" className="icon-btn hide-sm" aria-label={`Wishlist, ${wishlist.count} items`}>
            <Heart size={21} strokeWidth={1.5} />
            {wishlist.count > 0 && <span className="badge-count">{wishlist.count}</span>}
          </Link>
          <button type="button" className="icon-btn" onClick={openDrawer} aria-label={`Open shopping bag, ${count} items`}>
            <ShoppingBag size={21} strokeWidth={1.5} />
            {count > 0 && <span className="badge-count">{count}</span>}
          </button>
        </div>
      </div>
      <SearchBar open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
    {/* Rendered outside the header: backdrop-filter would otherwise trap position:fixed */}
    <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
