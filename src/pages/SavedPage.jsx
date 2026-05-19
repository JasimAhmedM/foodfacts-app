import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Box from '@mui/material/Box'
import { removeItem } from '../store/savedSlice'

function SavedPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const savedItems = useSelector((state) => state.saved.items)

  if (!savedItems || savedItems.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          Saved Items
        </Typography>
        <Typography color="text.secondary">
          You haven't saved anything yet. Search for a food and save it from the detail page.
        </Typography>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Saved Items ({savedItems.length})
      </Typography>
      <Grid container spacing={3}>
        {savedItems.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.code}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {product.product_name || 'Unknown product'}
                </Typography>
                {product.brands && (
                  <Typography color="text.secondary" sx={{ mb: 1 }}>
                    {product.brands}
                  </Typography>
                )}
                <Chip label={product.code} size="small" />
              </CardContent>
              <CardActions sx={{ justifyContent: 'space-between', flexWrap: 'wrap', gap: 1, px: 2, pb: 2 }}>
                <Button size="small" variant="contained" onClick={() => navigate(`/product/${product.code}`)}>
                  View Details
                </Button>
                <Button size="small" variant="outlined" color="secondary" onClick={() => dispatch(removeItem(product.code))}>
                  Remove
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default SavedPage
