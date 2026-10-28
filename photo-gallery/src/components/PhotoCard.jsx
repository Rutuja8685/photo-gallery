import HeartIcon from './HeartIcon'

function PhotoCard({ photo, isFavourite, onToggle }) {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow">
      <img
        src={`https://picsum.photos/id/${photo.id}/400/300`}
        alt={`Photo by ${photo.author}`}
        loading="lazy"
        className="h-48 w-full object-cover"
      />
      <div className="flex items-center justify-between p-3">
        <p className="truncate text-sm font-medium text-gray-700">{photo.author}</p>
        <button
          onClick={() => onToggle(photo.id)}
          aria-label={isFavourite ? 'Remove from favourites' : 'Add to favourites'}
          aria-pressed={isFavourite}
          className="cursor-pointer transition hover:scale-110"
        >
          <HeartIcon filled={isFavourite} />
        </button>
      </div>
    </div>
  )
}

export default PhotoCard