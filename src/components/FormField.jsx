export default function FormField({ id, label, error, as = 'input', ...props }) {
  const Tag = as
  return (
    <div className={`field ${error ? 'invalid' : ''}`}>
      <label htmlFor={id}>{label}</label>
      <Tag id={id} name={id} aria-invalid={!!error} aria-describedby={error ? `${id}-err` : undefined} {...props} />
      {error && <span id={`${id}-err`} className="error" role="alert">{error}</span>}
    </div>
  )
}
