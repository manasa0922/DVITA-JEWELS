import { Link } from 'react-router-dom'
import Breadcrumbs from '../components/Breadcrumbs.jsx'
import SmartImage from '../components/SmartImage.jsx'
import { images } from '../data/images.js'
import { useDocumentTitle } from '../hooks/useDocumentTitle.js'

const values = [
  { t: 'Elegance', d: 'Pieces with refined detail that look polished without trying too hard.' },
  { t: 'Thoughtful curation', d: 'Every design is selected for how it wears, not just how it photographs.' },
  { t: 'Accessible style', d: 'Beautiful jewellery should feel within reach for everyday life and celebrations.' },
]

export default function About() {
  useDocumentTitle('About Us')
  return (
    <div className="page-enter">
      <div className="container">
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'About Us' }]} />
        <div className="page-title">
          <span className="eyebrow">Our story</span>
          <h1>Jewellery with a sense of occasion</h1>
          <p style={{ maxWidth: 620, margin: '0 auto' }}>DVITA JEWELS is an online fashion and imitation jewellery brand for women who love traditional, contemporary and traditional-fusion style.</p>
        </div>
      </div>
      <section className="section section--cream">
        <div className="container split">
          <SmartImage src={images.story} alt="Gold-tone earrings" className="split__img" />
          <div>
            <span className="eyebrow">Our philosophy</span>
            <h2>Tradition, worn lightly</h2>
            <p>We believe traditional designs deserve a place in everyday wardrobes. Our focus is on pieces that carry the character of heritage jewellery while staying comfortable and versatile.</p>
            <p>Traditional-fusion means pairing familiar motifs such as temple patterns, pearls and kundan-inspired detailing with simpler, modern proportions.</p>
            <p style={{ fontSize: '.85rem', color: 'var(--brown-soft)' }}>Editable placeholder copy: update this text with your own story.</p>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="section-head"><span className="eyebrow">What we value</span><h2>Our values</h2></div>
          <div className="values">
            {values.map((v) => (
              <div className="value-card" key={v.t}><h3>{v.t}</h3><p style={{ marginBottom: 0 }}>{v.d}</p></div>
            ))}
          </div>
          <p style={{ textAlign: 'center', marginTop: '3rem' }}><Link to="/shop" className="btn btn--primary">Shop the collection</Link></p>
        </div>
      </section>
    </div>
  )
}
