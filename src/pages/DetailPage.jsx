import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import ErrorMessage from '../components/ErrorMessage'

function DetailPage({ saved, dispatch }) {
  const { barcode } = useParams()
  const navigate = useNavigate()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const isSaved = saved.some((item) => item.code === barcode)

  useEffect(() => {
    let cancelled = false

    const fetchProduct = async () => {
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
      dispatch({ type: 'REMOVE', code: barcode })
    } else {
      dispatch({ type: 'ADD', product })
    }
  }

  const nutrimentRows = [
    { label: 'Calories', key: 'energy-kcal_100g', suffix: 'kcal' },
    { label: 'Protein', key: 'proteins_100g', suffix: 'g' },
    { label: 'Carbohydrates', key: 'carbohydrates_100g', suffix: 'g' },
    { label: 'Fat', key: 'fat_100g', suffix: 'g' },
    { label: 'Sugar', key: 'sugars_100g', suffix: 'g' },
    { label: 'Salt', key: 'salt_100g', suffix: 'g' },
  ]

  return (
    <div className="page app-container detail-page">
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back
      </button>

      {loading && <p className="loading">Loading product details...</p>}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && !product && (
        <p className="empty-state">Product not found or unavailable.</p>
      )}

      {!loading && !error && product && (
        <div className="detail-card">
          <div className="detail-header">
            {product.image_small_url ? (
              <img
                src={product.image_small_url}
                alt={product.product_name || 'Product image'}
                className="detail-image"
              />
            ) : (
              <div className="detail-image detail-image-placeholder">No image</div>
            )}

            <div className="detail-info">
              <h2>{product.product_name || 'Unknown product'}</h2>
              {product.brands && <p className="brand">{product.brands}</p>}
              {product.quantity && <p>Size: {product.quantity}</p>}
              {product.countries && <p>Countries: {product.countries}</p>}
              {product.ingredients_text && (
                <p className="ingredients">Ingredients: {product.ingredients_text}</p>
              )}
            </div>
          </div>

          <section className="nutrition-table">
            <h3>Nutrition per 100g</h3>
            <div className="nutrition-grid">
              {nutrimentRows.map((row) => {
                const value = product.nutriments?.[row.key]
                return (
                  <div key={row.key} className="nutrition-row">
                    <span>{row.label}</span>
                    <strong>{value != null ? `${value} ${row.suffix}` : 'N/A'}</strong>
                  </div>
                )
              })}
            </div>
          </section>

          <button className="save-button" onClick={handleSaveToggle}>
            {isSaved ? '★ Remove from Saved' : '☆ Save to My List'}
          </button>
        </div>
      )}
    </div>
  )
}

export default DetailPage
