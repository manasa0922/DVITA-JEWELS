import { Link } from 'react-router-dom'
import SmartImage from './SmartImage.jsx'
export default function CategoryCard({ category }) {
  return (
    <Link to={`/shop?category=${category.id}`} className="category-card">
      <SmartImage src={category.image} alt="" />
      <div className="category-card__text">
        <h3>{category.name}</h3>
        <span>{category.blurb}</span>
      </div>
    </Link>
  )
}
