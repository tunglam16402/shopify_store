'use client'

import { IcoStarEmpty, IcoStarFill, IcoStarHalfFill } from '@/components/icons'
import { Button } from '@/components/ui/Button'
import { Reviews } from '@/types/reviews'
import React, { useMemo } from 'react'

interface TotalRatingProps {
  reviews: Reviews[]
  onOpenForm: () => void
}

const TotalRating: React.FC<TotalRatingProps> = ({ reviews, onOpenForm }) => {
  const stats = useMemo(() => {
    const total = reviews.length
    const counts = [5, 4, 3, 2, 1].map(
      (star) => reviews.filter((r) => r.rating === star).length
    )
    const avg = total ? reviews.reduce((a, r) => a + r.rating, 0) / total : 0
    return { total, counts, avg }
  }, [reviews])

  const fullStars = Math.floor(stats.avg)
  const hasHalfStar = stats.avg - fullStars >= 0.5
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

  return (
    <div className="mt-8 flex flex-col gap-6">
      <div className="flex items-center justify-center gap-4">
        <div className="text-6xl font-light">{stats.avg.toFixed(1)}</div>
        <div className="space-y-2 mt-2">
          <div className="flex gap-1">
            {[...Array(fullStars)].map((_, i) => (
              <IcoStarFill key={`full-${i}`} className="h-5 w-5" />
            ))}
            {hasHalfStar && <IcoStarHalfFill key="half" className="h-5 w-5" />}
            {[...Array(emptyStars)].map((_, i) => (
              <IcoStarEmpty key={`empty-${i}`} className="h-5 w-5" />
            ))}
          </div>
          <div className="text-sm font-semibold">
            Based on {stats.total} review{stats.total > 1 ? 's' : ''}
          </div>
        </div>
      </div>

      <div className="space-y-2 text-sm px-4">
        {[5, 4, 3, 2, 1].map((star, idx) => {
          const count = stats.counts[idx]
          const percent = stats.total ? (count / stats.total) * 100 : 0
          return (
            <div key={star} className="flex items-center gap-2">
              <span className="w-10">
                {star} {star === 1 ? 'star' : 'stars'}
              </span>
              <div className="flex-1 bg-gray-200 h-3 rounded-lg overflow-hidden">
                <div
                  className="bg-primary h-3"
                  style={{ width: `${percent}%` }}
                />
              </div>
              <span className="w-6 text-right">{count}</span>
            </div>
          )
        })}
      </div>

      <div className="text-center mt-4">
        <Button
          variant="primary"
          onClick={onOpenForm}
          className="px-8 capitalize font-semibold"
        >
          Write a review
        </Button>
      </div>
    </div>
  )
}

export default TotalRating
