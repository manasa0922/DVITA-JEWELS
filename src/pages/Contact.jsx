import { useState } from 'react'
import { Instagram, MessageCircle } from 'lucide-react'
import Breadcrumbs from '../components/Breadcrumbs.jsx'
import DemoNotice from '../components/DemoNotice.jsx'
import FormField from '../components/FormField.jsx'
import { siteConfig } from '../data/siteConfig.js'
import { isEmail } from '../utils/validation.js'
import { useDocumentTitle } from '../hooks/useDocumentTitle.js'

const empty = { name: '', email: '', subject: '', message: '' }

export default function Contact() {
  const [values, setValues] = useState(empty)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)
  const { contact, social } = siteConfig
  useDocumentTitle('Contact')

  const onChange = (e) => { setSent(false); setValues((v) => ({ ...v, [e.target.name]: e.target.value })) }
  const submit = (e) => {
    e.preventDefault()
    const found = {}
    if (!values.name.trim()) found.name = 'Please enter your name.'
    if (!isEmail(values.email)) found.email = 'Please enter a valid email address.'
    if (!values.subject.trim()) found.subject = 'Please add a subject.'
    if (values.message.trim().length < 10) found.message = 'Please write at least 10 characters.'
    setErrors(found)
    if (Object.keys(found).length) return document.getElementById(Object.keys(found)[0])?.focus()
    setSent(true) // demo only: nothing is sent
    setValues(empty)
  }

  return (
    <div className="container page-enter">
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Contact' }]} />
      <div className="page-title"><span className="eyebrow">Get in touch</span><h1 style={{ fontSize: 'clamp(2.2rem,5vw,3.4rem)' }}>Contact us</h1></div>
      <div className="contact-grid">
        <div>
          <DemoNotice>This contact form is a frontend demonstration. Messages are not sent until email communication is integrated.</DemoNotice>
          {sent && <div className="notice notice--success" role="status" style={{ marginBottom: '1.25rem' }}>Thank you! Your demo message was validated, but nothing was sent or stored.</div>}
          <form onSubmit={submit} noValidate aria-label="Contact form">
            <div className="form-row form-row--2">
              <FormField id="name" label="Name" value={values.name} onChange={onChange} error={errors.name} autoComplete="name" />
              <FormField id="email" label="Email" type="email" value={values.email} onChange={onChange} error={errors.email} autoComplete="email" />
            </div>
            <FormField id="subject" label="Subject" value={values.subject} onChange={onChange} error={errors.subject} />
            <FormField id="message" label="Message" as="textarea" value={values.message} onChange={onChange} error={errors.message} />
            <button type="submit" className="btn btn--primary">Send message</button>
          </form>
        </div>
        <aside>
          <h2 style={{ fontSize: '1.7rem' }}>Visit or message us</h2>
          <p style={{ fontSize: '.85rem', color: 'var(--brown-soft)' }}>Placeholder details: replace in siteConfig.js.</p>
          <ul style={{ marginBottom: '1.5rem' }}>
            <li>{contact.address}</li><li>{contact.email}</li><li>{contact.phone}</li><li>{contact.hours}</li>
          </ul>
          <div style={{ display: 'flex', gap: '.75rem', flexWrap: 'wrap' }}>
            <a className="btn btn--outline" href={social.instagram} target="_blank" rel="noopener noreferrer"><Instagram size={16} /> Instagram</a>
            <a className="btn btn--outline" href={social.whatsapp} target="_blank" rel="noopener noreferrer"><MessageCircle size={16} /> WhatsApp</a>
          </div>
        </aside>
      </div>
    </div>
  )
}
