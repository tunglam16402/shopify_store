import React from 'react'

interface IReviewSummary {
  start: number
  end: number
  total: number
}

const ReviewSummary: React.FC<IReviewSummary> = ({ start, end, total }) => {
  return (
    <div className="text-base font-medium md:text-lg">
      {total ? (
        <span>
          {start} – {end} of {total} reviews
        </span>
      ) : (
        <span>0 reviews</span>
      )}
    </div>
  )
}

export default ReviewSummary
