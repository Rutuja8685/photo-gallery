import { useReducer, useEffect, useState, useCallback, useMemo } from 'react'
import { useFetchPhotos } from '../hooks/useFetchPhotos'
import { favouritesReducer, TOGGLE_FAVOURITE } from '../reducers/favouritesReducer'
import PhotoCard from './PhotoCard'
import SearchBar from './SearchBar'
import Spinner from './Spinner'

const STORAGE_KEY = 'favourites'

// Lazy initializer: runs once to read saved favourites from localStorage
function loadFavourites() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return [] // if storage is blocked or data is corrupted
  }
}

function Gallery() {
  const { photos, loading, error } = useFetchPhotos()
  const [favourites, dispatch] = useReducer(favouritesReducer, [], loadFavourites)
  const [searchTerm, setSearchTerm] = useState('')

  // Save favourites to localStorage every time they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favourites))
  }, [favourites])

  // useCallback: keeps the same function between renders, so it is not
  // recreated every time the component re-renders (e.g. when a heart is clicked)
  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value)
  }, [])

  // useMemo: the filtering only re-runs when photos or searchTerm change,
  // not when favourites change
  const filteredPhotos = useMemo(() => {
    const term = searchTerm.trim().toLowerCase()
    return photos.filter((photo) => photo.author.toLowerCase().includes(term))
  }, [photos, searchTerm])

  if (loading) return <Spinner />

  if (error) {
    return (
      <p className="mx-auto max-w-md rounded bg-red-100 p-4 text-center text-red-700">
        Error: {error}
      </p>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 pb-10">
      <SearchBar value={searchTerm} onChange={handleSearchChange} />

      {filteredPhotos.length === 0 ? (
        <p className="py-10 text-center text-gray-500">No photos found</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {filteredPhotos.map((photo) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              isFavourite={favourites.includes(photo.id)}
              onToggle={(id) => dispatch({ type: TOGGLE_FAVOURITE, payload: id })}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Gallery