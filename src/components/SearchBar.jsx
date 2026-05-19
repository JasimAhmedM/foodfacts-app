import { useState } from 'react'

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
    <form onSubmit={handleSubmit} className="search-form">
      <div className="search-input-wrap">
        <input
          type="text"
          placeholder="Search for a food... e.g. banana, oats"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </div>
      {validationError && <p className="validation-error">{validationError}</p>}
    </form>
  )
}

export default SearchBar
