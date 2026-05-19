import Grid from '@mui/material/Grid'
import FoodCard from './FoodCard'

function FoodList({ products }) {
  if (!products || products.length === 0) {
    return null
  }

  return (
    <Grid container spacing={3}>
      {products.map((product) => (
        <Grid item xs={12} sm={6} md={4} key={product.code}>
          <FoodCard product={product} />
        </Grid>
      ))}
    </Grid>
  )
}

export default FoodList
