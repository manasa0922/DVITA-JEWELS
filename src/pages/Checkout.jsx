import { useState } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumbs from '../components/Breadcrumbs.jsx'
import DemoNotice from '../components/DemoNotice.jsx'
import FormField from '../components/FormField.jsx'
import SmartImage from '../components/SmartImage.jsx'
import { OrderSummary } from './ShoppingBag.jsx'
import { useCart } from '../context/CartContext.jsx'
import { formatINR } from '../utils/currency.js'
import { isEmail, isPhone, isPin } from '../utils/validation.js'
import { useDocumentTitle } from '../hooks/useDocumentTitle.js'

const empty = { name: '', email: '', phone: '', address: '', city: '', state: '', pin: '' }

function validate(v) {
  const e = {}
  if (!v.name.trim()) e.name = 'Please enter your full name.'
  if (!isEmail(v.email)) e.email = 'Please enter a valid email address.'
  if (!isPhone(v.phone)) e.phone = 'Please enter a valid phone number (10 digits).'
  if (!v.address.trim()) e.address = 'Please enter your delivery address.'
  if (!v.city.trim()) e.city = 'Please enter your city.'
  if (!v.state.trim()) e.state = 'Please enter your state.'
  if (!isPin(v.pin)) e.pin = 'Please enter a 6-digit PIN code.'
  return e
}

export default function Checkout() {
  const { items, count, clearBag } = useCart()
  const [values, setValues] = useState(empty)
  const [errors, setErrors] = useState({})
  const [confirmation, setConfirmation] = useState(null)
  useDocumentTitle('Demo checkout')

  const onChange = (e) => setValues((v) => ({ ...v, [e.target.name]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length) {
      document.getElementById(Object.keys(found)[0])?.focus()
      return
    }
    // Demo only: nothing is sent anywhere, and the form values are discarded.
    const ref = `DEMO-${Math.random().toString(36).slice(2, 8).toUpperCase()}`
    setConfirmation({ ref, count })
    clearBag()
    setValues(empty)
  }

  if (confirmation) {
    return (
      <div className="container page-enter">
        <div className="confirm">
          <span className="eyebrow">Demo order</span>
          <h1 style={{ fontSize: 'clamp(2rem,5vw,3rem)' }}>Thank you</h1>
          <p className="confirm__ref" aria-label="Sample order reference">{confirmation.ref}</p>
          <div className="notice" role="status" style={{ textAlign: 'left', margin: '1.5rem 0' }}>
            This was a demonstration. No payment was taken, no order was placed and no details were sent or stored. Real payment and order processing are not enabled yet.
          </div>
          <Link to="/shop" className="btn btn--primary">Continue browsing</Link>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="container page-enter">
        <div className="empty" style={{ margin: '3rem 0 var(--section-space)' }}>
          <h1 style={{ fontSize: '2rem' }}>Nothing to check out</h1>
          <p>Your bag is empty.</p>
          <Link to="/shop" className="btn btn--outline">Continue shopping</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container page-enter">
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Bag', to: '/bag' }, { label: 'Demo checkout' }]} />
      <div className="page-title"><h1 style={{ fontSize: 'clamp(2.2rem,5vw,3.4rem)' }}>Checkout</h1></div>
      <DemoNotice>Demo checkout only. Do not enter real payment details; there is no payment step and nothing is submitted anywhere.</DemoNotice>
      <div className="two-col">
        <form onSubmit={submit} noValidate aria-label="Demo checkout form">
          <h2 style={{ fontSize: '1.6rem' }}>Contact</h2>
          <div className="form-row form-row--2">
            <FormField id="name" label="Full name" value={values.name} onChange={onChange} error={errors.name} autoComplete="name" />
            <FormField id="phone" label="Phone" type="tel" value={values.phone} onChange={onChange} error={errors.phone} autoComplete="tel" />
          </div>
          <FormField id="email" label="Email" type="email" value={values.email} onChange={onChange} error={errors.email} autoComplete="email" />
          <h2 style={{ fontSize: '1.6rem', marginTop: '1.5rem' }}>Delivery address</h2>
          <FormField id="address" label="Address" value={values.address} onChange={onChange} error={errors.address} autoComplete="street-address" />
          <div className="form-row form-row--2">
            <FormField id="city" label="City" value={values.city} onChange={onChange} error={errors.city} autoComplete="address-level2" />
            <FormField id="state" label="State" value={values.state} onChange={onChange} error={errors.state} autoComplete="address-level1" />
          </div>
          <FormField id="pin" label="PIN code" inputMode="numeric" maxLength={6} value={values.pin} onChange={onChange} error={errors.pin} autoComplete="postal-code" />
          <button type="submit" className="btn btn--primary btn--block">Place demo order</button>
        </form>
        <OrderSummary cta={
          <ul style={{ marginTop: '1.25rem' }}>
            {items.map((l) => (
              <li key={l.id} style={{ display: 'grid', gridTemplateColumns: '56px 1fr auto', gap: '.75rem', alignItems: 'center', padding: '.5rem 0' }}>
                <SmartImage src={l.product.images[0]} alt="" className="" />
                <span style={{ fontSize: '.9rem' }}>{l.product.name} × {l.qty}</span>
                <span>{formatINR(l.product.price * l.qty)}</span>
              </li>
            ))}
          </ul>
        } />
      </div>
    </div>
  )
}
