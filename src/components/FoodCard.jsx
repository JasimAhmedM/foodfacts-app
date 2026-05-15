function FoodCard({ product }) {
  const { product_name, brands, nutriments, image_small_url } = product

  return (
    <div className="food-card">
      {image_small_url && <img src={image_small_url} alt={product_name} className="food-image" />}
      <h2>{product_name || 'Unknown Product'}</h2>
      {brands && <p className="brand"><strong>{brands}</strong></p>}
      {nutriments && (
        <div className="nutrition">
          {nutriments['energy-kcal_100g'] && <p>Calories: {nutriments['energy-kcal_100g']} kcal</p>}
          {nutriments.proteins_100g && <p>Protein: {nutriments.proteins_100g}g</p>}
          {nutriments.carbohydrates_100g && <p>Carbs: {nutriments.carbohydrates_100g}g</p>}
          {nutriments.fat_100g && <p>Fat: {nutriments.fat_100g}g</p>}
        </div>
      )}
    </div>
  )
}

export default FoodCard
