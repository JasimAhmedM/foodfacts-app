import { useState } from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
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
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom fontWeight={800}>
        Search Nutrition Info
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Type a food name to search real nutrition data.
      </Typography>
      <SearchBar onSearch={handleSearch} loading={loading} />
      {error && <ErrorMessage message={error} />}
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress color="primary" />
        </Box>
      )}
      {!loading && !error && query && results.length === 0 && (
        <Typography color="text.secondary" sx={{ mt: 4, textAlign: 'center' }}>
          No results found for “{query}”. Try a different search.
        </Typography>
      )}
      {!loading && !error && !query && (
        <Typography color="text.secondary" sx={{ mt: 4, textAlign: 'center' }}>
          Search for a food above to see its nutrition info.
        </Typography>
      )}
      <FoodList products={results} />
    </Container>
  )
}

export default HomePage
