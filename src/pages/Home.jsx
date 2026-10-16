import { useState } from 'react'
import { Link } from 'react-router-dom'
import SmartImage from '../components/SmartImage.jsx'
import CategoryCard from '../components/CategoryCard.jsx'
import ProductGrid from '../components/ProductGrid.jsx'
import QuickView from '../components/QuickView.jsx'
import NewsletterForm from '../components/NewsletterForm.jsx'
import { getCategories, getProducts } from '../services/productService.js'
import { images } from '../data/images.js'
import { siteConfig } from '../data/siteConfig.js'
import { useDocumentTitle } from '../hooks/useDocumentTitle.js'

export default function Home() {
  useDocumentTitle('')
  const [quick, setQuick] = useState(null)
  const products = getProducts()
  const bestsellers = products.filter((p) => p.bestseller).slice(0, 4)
  const arrivals = products.filter((p) => p.isNew).slice(0, 4)

  return (
    <div className="page-enter">
      <section className="hero">
        <SmartImage src={images.hero} alt="Model wearing elegant gold-tone jewellery" className="hero__img" eager />
        <div className="hero__shade" />
        <div className="container hero__content">
          <span className="eyebrow" style={{ color: 'var(--beige)' }}>New collection</span>
          <h1>Heirloom spirit,<br />modern grace</h1>
          <p>Fashion jewellery inspired by tradition and styled for today. Thoughtfully curated, made to be worn often.</p>
          <Link to="/shop" className="btn btn--light">Shop collection</Link>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Shop by category</span>
            <h2>Find your style</h2>
          </div>
          <div className="category-grid">
            {getCategories().map((c) => <CategoryCard key={c.id} category={c} />)}
          </div>
        </div>
      </section>

      <section className="section section--cream">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Bestsellers</span>
            <h2>Most loved pieces</h2>
            <p>Sample selection shown for demonstration.</p>
          </div>
          <ProductGrid products={bestsellers} onQuickView={setQuick} four />
          <p style={{ textAlign: 'center', marginTop: '2.5rem' }}><Link to="/shop" className="link-underline">View all</Link></p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Just in</span>
            <h2>New arrivals</h2>
          </div>
          <ProductGrid products={arrivals} onQuickView={setQuick} four />
        </div>
      </section>

      <section className="section section--cream">
        <div className="container split">
          <SmartImage src={images.story} alt="Close-up of traditional-fusion earrings" className="split__img" />
          <div className="split__text">
            <span className="eyebrow">Our story</span>
            <h2>Where tradition meets everyday</h2>
            <p>DVITA JEWELS is for women who love the beauty of traditional jewellery but want pieces that sit easily in modern life. Each design is chosen for its balance of detail, comfort and style.</p>
            <p>Traditional-fusion is at the heart of the brand: temple motifs, pearls and kundan-inspired details, reimagined with cleaner lines.</p>
            <Link to="/about" className="link-underline">Read our story</Link>
          </div>
        </div>
      </section>

      <section className="promo">
        <SmartImage src={images.promo} alt="" className="promo__img" />
        <div className="hero__shade" />
        <div className="container promo__content">
          <span className="eyebrow" style={{ color: 'var(--beige)' }}>Festive edit</span>
          <h2>Complete looks, ready to wear</h2>
          <p>Necklace and earring sets for celebrations, curated as one.</p>
          <Link to="/shop?category=sets" className="btn btn--light">Explore sets</Link>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Stay in touch</span>
            <h2>Join the DVITA circle</h2>
            <p>Be the first to hear about new collections.</p>
          </div>
          <NewsletterForm />
        </div>
      </section>

      <section className="section section--cream">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Instagram</span>
            <h2>Styled by you</h2>
            <p><a className="link-underline" href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer">Follow us on Instagram</a></p>
          </div>
          <div className="gallery">
            {images.gallery.map((src, i) => (
              <a key={src} href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" aria-label={`Instagram inspiration ${i + 1}`}>
                <SmartImage src={src} alt="" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {quick && <QuickView product={quick} onClose={() => setQuick(null)} />}
    </div>
  )
}
