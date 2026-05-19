import { useState } from 'react'
import SearchBar from '../components/SearchBar'
import FoodList from '../components/FoodList'
import ErrorMessage from '../components/ErrorMessage'
import useFoodSearch from '../hooks/useFoodSearch'

function HomePage() {
  const [query, setQuery] = useState('')
  const { results, loading, error, searchFood } = useFoodSearch()

  const handleSearch = async (searchQuery) => {
    setQuery(searchQuery)
    await searchFood(searchQuery)
  }

  return (
    <div className="page app-container">
      <h2>Search Nutrition Info</h2>
      <SearchBar onSearch={handleSearch} />
      {loading && <p className="loading">Loading...</p>}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && (
        <>
          {query ? (
            results.length > 0 ? (
              <FoodList products={results} />
            ) : (
              <p className="empty-state">No results found for “{query}”. Try a different search.</p>
            )
          ) : (
            <p className="empty-state">Search for a food above to see its nutrition info.</p>
          )}
        </>
      )}
    </div>
  )
}

export default HomePage
