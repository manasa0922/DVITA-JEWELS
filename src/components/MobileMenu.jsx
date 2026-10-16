import { NavLink } from 'react-router-dom'
import { X } from 'lucide-react'
import { navLinks } from '../data/navigation.js'
import { useOverlay } from '../hooks/useOverlay.js'

export default function MobileMenu({ open, onClose }) {
  useOverlay(open, onClose)
  return (
    <>
      <div className={`overlay ${open ? 'open' : ''}`} onClick={onClose} aria-hidden="true" />
      <aside className={`drawer drawer--left ${open ? 'open' : ''}`} aria-label="Mobile menu" aria-hidden={!open}>
        <div className="drawer-head">
          <span className="logo" style={{ fontSize: '1.3rem' }}>DVITA</span>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Close menu"><X /></button>
        </div>
        <nav className="drawer-body mobile-nav" aria-label="Main">
          {navLinks.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'} onClick={onClose} className={({ isActive }) => (isActive ? 'active' : '')}>{l.label}</NavLink>
          ))}
          <NavLink to="/wishlist" onClick={onClose}>Wishlist</NavLink>
          <NavLink to="/faq" onClick={onClose}>FAQ</NavLink>
        </nav>
      </aside>
    </>
  )
}
