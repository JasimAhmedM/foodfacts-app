import { useState, useRef } from 'react'
import axios from 'axios'

function useFoodSearch() {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const controllerRef = useRef(null)
  const requestIdRef = useRef(0)

  const searchFood = async (query) => {
    if (!query || !query.trim()) {
      setResults([])
      setError(null)
      return
    }

    // cancel previous request (prevents stale responses/errors)
    if (controllerRef.current) {
      try {
        controllerRef.current.abort()
      } catch (e) {
        // ignore
      }
    }

    const controller = new AbortController()
    controllerRef.current = controller

    // bump request id to identify stale responses
    requestIdRef.current += 1
    const thisRequestId = requestIdRef.current

    setLoading(true)
    setError(null)

    try {
      const url = '/api/cgi/search.pl'
      const maxRetries = 2
      let attempt = 0
      let response
      while (attempt <= maxRetries) {
        try {
          response = await axios.get(url, {
            params: {
              search_terms: query,
              json: 1,
              page_size: 10,
            },
            signal: controller.signal,
            timeout: 15000,
          })
          break
        } catch (innerErr) {
          const canceled = innerErr && (innerErr.name === 'CanceledError' || innerErr.code === 'ERR_CANCELED' || innerErr.message === 'canceled')
          if (canceled) throw innerErr

          const status = innerErr?.response?.status
          if (status && status >= 500 && attempt < maxRetries) {
            // simple backoff
            await new Promise((res) => setTimeout(res, 250 * (attempt + 1)))
            attempt += 1
            continue
          }
          throw innerErr
        }
      }

      // ignore this response if a newer request started
      if (thisRequestId !== requestIdRef.current) return

      const products = Array.isArray(response.data.products) ? response.data.products : []
      const filtered = products.filter(
        (p) => p?.product_name?.trim() && p?.code?.trim()
      )

      setResults(filtered)
    } catch (err) {
      // if request was aborted because a new one started, ignore
      const canceled = err && (err.name === 'CanceledError' || err.code === 'ERR_CANCELED' || err.message === 'canceled')
      if (canceled) {
        return
      }

      // only set errors for the latest request
      if (thisRequestId !== requestIdRef.current) return

      if (err.response) {
        setError(`Server error: ${err.response.status}. Please try again.`)
      } else if (err.request) {
        setError('Network error. Check your connection and try again.')
      } else {
        setError('Something went wrong. Please try again.')
      }
      setResults([])
    } finally {
      // only update loading for the latest request
      if (thisRequestId === requestIdRef.current) {
        setLoading(false)
      }
    }
  }

  return { results, loading, error, searchFood }
}

export default useFoodSearch
