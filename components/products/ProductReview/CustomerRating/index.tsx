import RatingBar from './RatingBar'

interface CustomerRatingProps {
  performance: {
    avgQuality: number
    avgValue: number
  }
}
const CustomerRating = ({ performance }: CustomerRatingProps) => {
  const fixedQuality = Number(performance.avgQuality.toFixed(1))
  const fixedValue = Number(performance.avgValue.toFixed(1))

  return (
    <div className="border-t mt-8 pt-8 md:pt-12 md:mt-12">
      <div className="flex flex-col md:flex-row gap-5 md:gap-16 mx-auto max-w-4xl">
        <RatingBar label="Average of Product Quality" value={fixedQuality} />
        <RatingBar label="Average of Product Value" value={fixedValue} />
      </div>
    </div>
  )
}

export default CustomerRating
