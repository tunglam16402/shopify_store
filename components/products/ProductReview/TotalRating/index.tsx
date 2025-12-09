'use client'

import { IcoStarEmpty, IcoStarFill, IcoStarHalfFill } from '@/components/icons'
import { Button } from '@/components/ui/Button'
import React, { useMemo } from 'react'
import ReviewButton from './ReviewButton'

interface Summary {
  avgRating: number
  totalReviews: number
  breakdown: Record<1 | 2 | 3 | 4 | 5, number>
}

interface TotalRatingProps {
  summary: Summary
  onOpenForm: () => void
  verifiedBuyer: boolean
}

const TotalRating: React.FC<TotalRatingProps> = ({
  summary,
  onOpenForm,
  verifiedBuyer,
}) => {
  const { avgRating, totalReviews, breakdown } = summary

  const { fullStars, hasHalfStar, emptyStars } = useMemo(() => {
    const full = Math.floor(avgRating)
    const half = avgRating - full >= 0.5
    return {
      fullStars: full,
      hasHalfStar: half,
      emptyStars: 5 - full - (half ? 1 : 0),
    }
  }, [avgRating])

  return (
    <div className="mt-8 md:px-24 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10 relative">
      <div className="flex items-center justify-center gap-4">
        <div className="text-6xl font-light">{avgRating.toFixed(1)}</div>
        <div className="space-y-2 mt-2">
          <div className="flex">
            {[...Array(fullStars)].map((_, i) => (
              <IcoStarFill key={`full-${i}`} className="h-6 w-6" />
            ))}
            {hasHalfStar && <IcoStarHalfFill className="h-6 w-6" />}
            {[...Array(emptyStars)].map((_, i) => (
              <IcoStarEmpty key={`empty-${i}`} className="h-6 w-6" />
            ))}
          </div>
          <div className="text-sm">
            Based on {totalReviews} review{totalReviews > 1 ? 's' : ''}
          </div>
        </div>
      </div>

      <div className="hidden md:block w-px bg-gray-200 h-36" />

      <div className="space-y-2 w-full text-sm px-10 md:px-0">
        {[5, 4, 3, 2, 1].map((star) => {
          const count = breakdown[star as 1 | 2 | 3 | 4 | 5] ?? 0
          const percent = totalReviews ? (count / totalReviews) * 100 : 0
          return (
            <div key={star} className="flex items-center gap-2 md:gap-4">
              <span className="w-10">
                {star} {star === 1 ? 'star' : 'stars'}
              </span>
              <div className="flex-1 bg-gray-200 h-3 rounded-lg overflow-hidden">
                <div
                  className="bg-primary h-3"
                  style={{ width: `${percent}%` }}
                />
              </div>
              <span className="text-right">{count}</span>
            </div>
          )
        })}
      </div>

      <div className="hidden md:block w-px bg-gray-200 h-36" />
      {verifiedBuyer}

      <div className="text-center mt-4 md:mt-0">
        <ReviewButton onOpenForm={onOpenForm} verifiedBuyer={verifiedBuyer} />
      </div>
    </div>
  )
}

export default TotalRating
