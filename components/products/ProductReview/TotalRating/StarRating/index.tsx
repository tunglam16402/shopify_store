import { IcoStarEmpty, IcoStarFill, IcoStarHalfFill } from '@/components/icons'

interface StarRatingProps {
  full: number
  half: boolean
  empty: number
  size?: number
}

export default function StarRating({
  full,
  half,
  empty,
  size = 6,
}: StarRatingProps) {
  const className = `h-${size} w-${size}`

  return (
    <div className="flex">
      {Array.from({ length: full }).map((_, i) => (
        <IcoStarFill key={`full-${i}`} className={className} />
      ))}
      {half && <IcoStarHalfFill className={className} />}
      {Array.from({ length: empty }).map((_, i) => (
        <IcoStarEmpty key={`empty-${i}`} className={className} />
      ))}
    </div>
  )
}