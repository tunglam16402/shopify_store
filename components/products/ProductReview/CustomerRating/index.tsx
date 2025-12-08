import RatingBar from './RatingBar'

interface CustomerRatingProps {
  performance: {
    avgQuality: number
    avgValue: number
  }
}
const CustomerRating = ({ performance }: CustomerRatingProps) => {
  console.log('performance quality value:>> ', performance)

  return (
    <div className="border-t mt-8 pt-8 md:pt-12 md:mt-12">
      <div className="flex flex-col md:flex-row gap-5 md:gap-16 mx-auto max-w-4xl">
        <RatingBar
          label="Average of Product Quality"
          value={performance.avgQuality}
        />
        <RatingBar label="Average of Product Value" value={performance.avgValue} />
      </div>
    </div>
  )
}

export default CustomerRating
