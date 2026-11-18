import { useState } from 'react'
import PenNib from './PenNib.jsx'
import { getWorkshopImage } from '../utils/workshopImages.js'

function WorkshopImage({
  workshop,
  alt,
  className = '',
  loading = 'lazy',
}) {
  const [imageFailed, setImageFailed] = useState(false)
  const image = getWorkshopImage(workshop)

  if (!image || imageFailed) {
    return (
      <div
        aria-label={`${workshop.title} workshop photo unavailable`}
        className={`flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-blush-100 to-brand-100 text-brand-700 ${className}`}
        role="img"
      >
        <PenNib className="h-10 w-10" />
        <span className="text-sm font-semibold">Workshop photo coming soon</span>
      </div>
    )
  }

  return (
    <img
      alt={alt || `Participants at the ${workshop.title} workshop`}
      className={className}
      loading={loading}
      onError={() => setImageFailed(true)}
      src={image}
    />
  )
}

export default WorkshopImage
