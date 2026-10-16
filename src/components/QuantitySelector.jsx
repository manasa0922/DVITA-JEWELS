import { Minus, Plus } from 'lucide-react'
export default function QuantitySelector({ value, onChange, min = 1, max = 10, label = 'Quantity' }) {
  return (
    <div className="qty" role="group" aria-label={label}>
      <button type="button" aria-label="Decrease quantity" onClick={() => onChange(value - 1)} disabled={value <= min}><Minus size={16} /></button>
      <output aria-live="polite">{value}</output>
      <button type="button" aria-label="Increase quantity" onClick={() => onChange(value + 1)} disabled={value >= max}><Plus size={16} /></button>
    </div>
  )
}
