import { useState } from 'react'
import { Minus, Plus } from 'lucide-react'
import Breadcrumbs from '../components/Breadcrumbs.jsx'
import { faqs } from '../data/faqs.js'
import { useDocumentTitle } from '../hooks/useDocumentTitle.js'

export default function FAQ() {
  const [open, setOpen] = useState(0)
  useDocumentTitle('FAQ')
  return (
    <div className="container page-enter">
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'FAQ' }]} />
      <div className="page-title"><span className="eyebrow">Help</span><h1 style={{ fontSize: 'clamp(2.2rem,5vw,3.4rem)' }}>Frequently asked questions</h1></div>
      <div className="prose">
        {faqs.map((f, i) => (
          <div className="faq-item" key={f.q}>
            <h2 style={{ margin: 0 }}>
              <button type="button" aria-expanded={open === i} aria-controls={`faq-${i}`} onClick={() => setOpen(open === i ? -1 : i)}>
                <span>{f.q}</span>{open === i ? <Minus size={18} /> : <Plus size={18} />}
              </button>
            </h2>
            {open === i && <div id={`faq-${i}`} className="answer">{f.a}</div>}
          </div>
        ))}
      </div>
    </div>
  )
}
