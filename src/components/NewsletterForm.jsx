import { useState } from 'react'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState({ type: '', msg: '' })

  const submit = (e) => {
    e.preventDefault()
    if (!/^\S+@\S+\.\S+$/.test(email)) return setStatus({ type: 'error', msg: 'Please enter a valid email address.' })
    // Demo only: nothing is sent or stored anywhere.
    setStatus({ type: 'ok', msg: 'Thank you! This is a demo: your email was not saved or sent anywhere.' })
    setEmail('')
  }

  return (
    <form className="newsletter" onSubmit={submit} noValidate>
      <label htmlFor="nl-email" className="sr-only">Email address</label>
      <div className="newsletter__row">
        <input id="nl-email" type="email" placeholder="Your email address" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" aria-describedby="nl-msg" />
        <button className="btn btn--primary" type="submit">Subscribe</button>
      </div>
      <p id="nl-msg" role="status" style={{ margin: 0, fontSize: '.85rem', color: status.type === 'error' ? 'var(--danger)' : 'var(--success)' }}>{status.msg}</p>
      <p style={{ margin: 0, fontSize: '.75rem', color: 'var(--brown-soft)' }}>Newsletter signup is a frontend demonstration until email integration is added.</p>
    </form>
  )
}
