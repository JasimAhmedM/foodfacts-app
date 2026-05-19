import { useNavigate } from 'react-router-dom'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'

function FoodCard({ product }) {
  const navigate = useNavigate()
  const { product_name, brands, nutriments, image_small_url, code } = product

  const handleClick = () => {
    if (!code) return
    navigate(`/product/${code}`, { state: { product } })
  }

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardActionArea onClick={handleClick} sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
        {image_small_url && (
          <CardMedia
            component="img"
            height="180"
            image={image_small_url}
            alt={product_name}
            sx={{ objectFit: 'contain', backgroundColor: '#f8f8f8' }}
          />
        )}
        <CardContent sx={{ flex: 1 }}>
          <Typography variant="h6" gutterBottom>
            {product_name || 'Unknown Product'}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {brands || 'Unknown Brand'}
          </Typography>
          {nutriments?.['energy-kcal_100g'] && (
            <Chip
              label={`${Math.round(nutriments['energy-kcal_100g'])} kcal/100g`}
              size="small"
            />
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default FoodCard
