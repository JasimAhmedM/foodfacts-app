import { useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import SearchIcon from '@mui/icons-material/Search'

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('')
  const [validationError, setValidationError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!query.trim()) {
      setValidationError('Please enter a food name to search.')
      return
    }

    if (query.trim().length < 2) {
      setValidationError('Search must be at least 2 characters.')
      return
    }

    setValidationError('')
    onSearch(query.trim())
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', maxWidth: 600, mx: 'auto', mb: 4 }}>
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search for a food... e.g. banana, oats"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          error={!!validationError}
          helperText={validationError}
          size="medium"
        />
        <Button
          type="submit"
          variant="contained"
          size="large"
          startIcon={<SearchIcon />}
          sx={{ flexShrink: 0 }}
        >
          Search
        </Button>
      </Box>
    </Box>
  )
}

export default SearchBar
