import { Link } from 'react-router-dom'
import { useDocumentTitle } from '../hooks/useDocumentTitle.js'

export default function NotFound({ message = "The page you're looking for doesn't exist." }) {
  useDocumentTitle('Page not found')
  return (
    <div className="container not-found page-enter">
      <div className="big" aria-hidden="true">404</div>
      <h1 style={{ fontSize: '2.2rem' }}>Page not found</h1>
      <p>{message}</p>
      <Link to="/" className="btn btn--primary">Back to home</Link>
    </div>
  )
}
