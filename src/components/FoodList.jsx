import FoodCard from './FoodCard'

function FoodList({ products }) {
  if (!products || products.length === 0) {
    return null
  }

  return (
    <div className="food-list">
      {products.map((product) => (
        <FoodCard key={product.code} product={product} />
      ))}
    </div>
  )
}

export default FoodList
