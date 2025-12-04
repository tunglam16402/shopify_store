import React from 'react'

interface IReviewSummary {
  start: number
  end: number
  total: number
}

const ReviewSummary: React.FC<IReviewSummary> = ({ start, end, total }) => {
  return (
    <div className="text-base font-medium md:text-lg">
      {start} – {end} of {total} reviews
    </div>
  )
}

export default ReviewSummary
