'use client'

import { TotalRatingProps } from '../type'
import ReviewButton from './ReviewButton'
import StarRating from './StarRating'

const RATING_LEVELS = [5, 4, 3, 2, 1] as const

export default function TotalRating({
  summary,
  onOpenForm,
  verifiedBuyer,
  hasReviewed,
}: TotalRatingProps) {
  const { avgRating, totalReviews, breakdown } = summary

  if (!summary) {
    return null
  }

  return (
    <div className="relative mt-8 flex flex-col items-center gap-6 md:flex-row md:gap-10 md:px-24">
      {/* Average rating */}
      <div className="flex items-center gap-4">
        <div className="text-6xl font-light">{avgRating.toFixed(1)}</div>

        <div className="mt-2 space-y-2">
          <StarRating rating={avgRating} />
          <div className="text-sm">
            Based on {totalReviews} review{totalReviews !== 1 && 's'}
          </div>
        </div>
      </div>

      <div className="hidden h-36 w-px bg-gray-200 md:block" />

      {/* Breakdown */}
      <div className="w-full space-y-2 px-10 text-sm md:px-0">
        {RATING_LEVELS.map((star) => {
          const count = breakdown[star]
          const percent = totalReviews ? (count / totalReviews) * 100 : 0

          return (
            <div key={star} className="flex items-center gap-4">
              <span className="w-10">
                {star} {star === 1 ? 'star' : 'stars'}
              </span>

              <div className="flex-1 overflow-hidden rounded-lg bg-gray-200 h-3">
                <div
                  className="h-full bg-primary transition-all"
                  style={{ width: `${percent}%` }}
                />
              </div>

              <span className="w-6 text-right">{count}</span>
            </div>
          )
        })}
      </div>

      <div className="hidden h-36 w-px bg-gray-200 md:block" />

      <div className="mt-4 text-center md:mt-0">
        <ReviewButton
          onOpenForm={onOpenForm}
          verifiedBuyer={verifiedBuyer}
          hasReviewed={hasReviewed}
        />
      </div>
    </div>
  )
}
