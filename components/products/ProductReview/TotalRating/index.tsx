// components/review/TotalRating.tsx
'use client'

import React, { useMemo, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Reviews } from '@/types/reviews'

interface TotalRatingProps {
  reviews: Reviews[]
  onOpenForm: () => void
}

const TotalRating: React.FC<TotalRatingProps> = ({ reviews, onOpenForm }) => {
  const [hoveredStar, setHoveredStar] = useState<number | null>(null)

  const stats = useMemo(() => {
    const total = reviews.length
    const counts = [5, 4, 3, 2, 1].map(
      (star) => reviews.filter((r) => r.rating === star).length
    )
    const avg = total ? reviews.reduce((a, r) => a + r.rating, 0) / total : 0
    return { total, counts, avg }
  }, [reviews])

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <div>
          <span className="text-2xl font-bold">{stats.avg.toFixed(1)}</span> / 5
          <span className="ml-2 text-sm text-gray-500">{stats.total} reviews</span>
        </div>
        <Button size="sm" onClick={onOpenForm}>
          Add Review
        </Button>
      </div>
      <div className="space-y-1 text-sm">
        {[5, 4, 3, 2, 1].map((star, idx) => (
          <div key={star} className="flex justify-between">
            <span>{star} star</span>
            <span>{stats.counts[idx]}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TotalRating
