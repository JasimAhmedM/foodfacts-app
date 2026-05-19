import { useNavigate } from 'react-router-dom'

function SavedPage({ saved, dispatch }) {
  const navigate = useNavigate()

  if (!saved || saved.length === 0) {
    return (
      <div className="page app-container">
        <h2>Saved Items</h2>
        <p>You haven't saved anything yet. Search for a food and save it from the detail page.</p>
      </div>
    )
  }

  return (
    <div className="page app-container">
      <h2>Saved Items ({saved.length})</h2>
      <div className="saved-list">
        {saved.map((product) => (
          <div key={product.code} className="saved-item">
            <div>
              <h3>{product.product_name || 'Unknown product'}</h3>
              {product.brands && <p className="brand">{product.brands}</p>}
            </div>
            <div className="saved-actions">
              <button onClick={() => navigate(`/product/${product.code}`)}>
                View Details
              </button>
              <button
                className="secondary-button"
                onClick={() => dispatch({ type: 'REMOVE', code: product.code })}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SavedPage
