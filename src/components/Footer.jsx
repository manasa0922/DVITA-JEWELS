import { Link } from 'react-router-dom'
import { Instagram, MessageCircle } from 'lucide-react'
import { siteConfig } from '../data/siteConfig.js'

export default function Footer() {
  const { contact, social } = siteConfig
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="logo" style={{ textAlign: 'left', color: 'var(--ivory)' }}>DVITA <span style={{ color: 'var(--gold)' }}>JEWELS</span></div>
            <p style={{ marginTop: '1rem', maxWidth: 300 }}>Elegant traditional and traditional-fusion jewellery, thoughtfully curated for everyday and celebration.</p>
            <div className="socials">
              <a className="icon-btn" href={social.instagram} target="_blank" rel="noopener noreferrer" aria-label="DVITA JEWELS on Instagram"><Instagram size={20} /></a>
              <a className="icon-btn" href={social.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp"><MessageCircle size={20} /></a>
            </div>
          </div>
          <div>
            <h3>Explore</h3>
            <ul>
              <li><Link to="/shop">Shop</Link></li>
              <li><Link to="/collections">Collections</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h3>Policies</h3>
            <ul>
              <li><Link to="/shipping">Shipping &amp; Delivery</Link></li>
              <li><Link to="/returns">Returns &amp; Exchange</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms &amp; Conditions</Link></li>
            </ul>
          </div>
          <div>
            <h3>Contact</h3>
            <ul>
              <li>{contact.address}</li>
              <li>{contact.email}</li>
              <li>{contact.phone}</li>
              <li>{contact.hours}</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} DVITA JEWELS. All rights reserved.</span>
          <span>Demo storefront: sample products only, no real orders or payments.</span>
        </div>
      </div>
    </footer>
  )
}
