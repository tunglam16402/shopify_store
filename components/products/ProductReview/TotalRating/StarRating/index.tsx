import { IcoStarEmpty, IcoStarFill, IcoStarHalfFill } from '@/components/icons'

const sizeMap = {
  4: 'h-4 w-4',
  5: 'h-5 w-5',
  6: 'h-6 w-6',
  8: 'h-8 w-8',
} as const

interface StarRatingProps {
  rating: number
  size?: keyof typeof sizeMap
}

export default function StarRating({
  rating,
  size = 6,
}: StarRatingProps) {
  const className = sizeMap[size]

  const fullStars = Math.floor(rating)
  const hasHalfStar = rating - fullStars >= 0.5
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

  return (
    <div className="flex" aria-label={`Rating ${rating} out of 5`}>
      {Array.from({ length: fullStars }).map((_, i) => (
        <IcoStarFill key={`full-${i}`} className={className} />
      ))}

      {hasHalfStar && <IcoStarHalfFill className={className} />}

      {Array.from({ length: emptyStars }).map((_, i) => (
        <IcoStarEmpty key={`empty-${i}`} className={className} />
      ))}
    </div>
  )
}
