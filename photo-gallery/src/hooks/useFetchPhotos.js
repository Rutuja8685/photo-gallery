import { useState, useEffect } from 'react'

const API_URL = 'https://picsum.photos/v2/list?limit=30'

export function useFetchPhotos() {
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    async function fetchPhotos() {
      try {
        const response = await fetch(API_URL, { signal: controller.signal })
        // fetch does not throw on 404/500, so check manually
        if (!response.ok) {
          throw new Error('Failed to fetch photos (status ' + response.status + ')')
        }
        const data = await response.json()
        setPhotos(data)
        setError(null)
        setLoading(false)
      } catch (err) {
        // Ignore the abort that StrictMode causes in development
        if (err.name === 'AbortError') return
        setError(err.message || 'Something went wrong')
        setLoading(false)
      }
    }

    fetchPhotos()

    // Cancel the request if the component unmounts
    return () => controller.abort()
  }, [])

  return { photos, loading, error }
}