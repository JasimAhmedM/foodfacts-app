import { useState, useEffect } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { addItem, removeItem } from '../store/savedSlice'
import axios from 'axios'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import CircularProgress from '@mui/material/CircularProgress'
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd'
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ErrorMessage from '../components/ErrorMessage'
import NutritionRow from '../components/NutritionRow'

function DetailPage() {
  const { barcode } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const savedItems = useSelector((state) => state.saved.items)

  const [product, setProduct] = useState(location.state?.product || null)
  const [loading, setLoading] = useState(!location.state?.product)
  const [error, setError] = useState(null)

  const isSaved = savedItems.some((item) => item.code === barcode)

  useEffect(() => {
    let cancelled = false

    const fetchProduct = async () => {
      if (product?.code === barcode) {
        setLoading(false)
        return
      }

      setLoading(true)
      setError(null)

      try {
        const response = await axios.get(
          `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
        )

        if (cancelled) return

        const returnedProduct = response.data?.product
        if (!returnedProduct || response.data.status !== 1) {
          setError('Product not found. Please try a different item.')
          setProduct(null)
        } else {
          setProduct(returnedProduct)
        }
      } catch (err) {
        if (cancelled) return

        if (err.response) {
          setError(`Server error: ${err.response.status}. Please try again.`)
        } else if (err.request) {
          setError('Network error. Check your connection and try again.')
        } else {
          setError('Could not load product details. Please try again.')
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    fetchProduct()

    return () => {
      cancelled = true
    }
  }, [barcode])

  const handleSaveToggle = () => {
    if (!product) return

    if (isSaved) {
      dispatch(removeItem(barcode))
    } else {
      dispatch(addItem(product))
    }
  }

  const nutrimentRows = [
    { label: 'Calories', key: 'energy-kcal_100g', unit: ' kcal' },
    { label: 'Protein', key: 'proteins_100g', unit: ' g' },
    { label: 'Carbohydrates', key: 'carbohydrates_100g', unit: ' g' },
    { label: 'Fat', key: 'fat_100g', unit: ' g' },
    { label: 'Sugar', key: 'sugars_100g', unit: ' g' },
    { label: 'Salt', key: 'salt_100g', unit: ' g' },
  ]

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{ mb: 3 }}
      >
        Back
      </Button>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress color="primary" />
        </Box>
      )}

      {error && <ErrorMessage message={error} />}

      {!loading && !error && !product && (
        <Typography color="text.secondary">Product not found or unavailable.</Typography>
      )}

      {!loading && !error && product && (
        <Paper sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, mb: 3 }}>
            {product.image_small_url ? (
              <Box
                component="img"
                src={product.image_small_url}
                alt={product.product_name || 'Product image'}
                sx={{ width: { xs: '100%', md: 220 }, height: 220, objectFit: 'contain', borderRadius: 2, backgroundColor: '#f8f8f8' }}
              />
            ) : (
              <Box sx={{ width: { xs: '100%', md: 220 }, height: 220, borderRadius: 2, backgroundColor: '#f8f8f8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography color="text.secondary">No image</Typography>
              </Box>
            )}
            <Box sx={{ flex: 1 }}>
              <Typography variant="h5" gutterBottom>
                {product.product_name || 'Unknown product'}
              </Typography>
              {product.brands && <Typography color="text.secondary" gutterBottom>{product.brands}</Typography>}
              {product.quantity && <Typography>Size: {product.quantity}</Typography>}
              {product.countries && <Typography>Countries: {product.countries}</Typography>}
              {product.ingredients_text && (
                <Typography color="text.secondary" sx={{ mt: 1 }}>
                  Ingredients: {product.ingredients_text}
                </Typography>
              )}
              <Button
                variant={isSaved ? 'outlined' : 'contained'}
                color={isSaved ? 'secondary' : 'primary'}
                startIcon={isSaved ? <BookmarkRemoveIcon /> : <BookmarkAddIcon />}
                onClick={handleSaveToggle}
                sx={{ mt: 3 }}
              >
                {isSaved ? 'Remove from Saved' : 'Save to My List'}
              </Button>
            </Box>
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom>
              Nutrition per 100g
            </Typography>
            {nutrimentRows.map((row) => (
              <NutritionRow
                key={row.key}
                label={row.label}
                value={product.nutriments?.[row.key]}
                unit={row.unit}
              />
            ))}
          </Box>
        </Paper>
      )}
    </Container>
  )
}

export default DetailPage
