import { Reviews } from '@/types/reviews'
import RatingBar from './RatingBar'

interface CustomerRatingProps {
  reviews: Reviews[]
}

const CustomerRating = ({ reviews }: CustomerRatingProps) => {
  const avgQuality =
    reviews
      .filter((r) => typeof r.quality === 'number')
      .reduce((sum, r) => sum + (r.quality ?? 0), 0) /
    Math.max(1, reviews.filter((r) => typeof r.quality === 'number').length)

  const avgValue =
    reviews
      .filter((r) => typeof r.value === 'number')
      .reduce((sum, r) => sum + (r.value ?? 0), 0) /
    Math.max(1, reviews.filter((r) => typeof r.value === 'number').length)

  return (
    <div className="border-t mt-8 pt-8 md:pt-12 md:mt-12">
      <div className="flex flex-col md:flex-row gap-5 md:gap-16 mx-auto max-w-4xl">
        <RatingBar label="Average of Product Quality" value={avgQuality} />
        <RatingBar label="Average of Product Value" value={avgValue} />
      </div>
    </div>
  )
}

export default CustomerRating
