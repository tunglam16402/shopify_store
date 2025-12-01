'use client'

import React, { useState } from 'react'
import { IcoStarEmpty, IcoStarFill } from '@/components/icons'

interface StarRatingProps {
  rating: number
  disabled?: boolean
  onChange?: (rating: number) => void
}

const StarRatingField: React.FC<StarRatingProps> = ({
  rating,
  disabled = false,
  onChange,
}) => {
  const [hover, setHover] = useState(0)

  const labels: Record<number, string> = {
    1: 'Very Poor',
    2: 'Poor',
    3: 'Average',
    4: 'Good',
    5: 'Excellent',
  }

  const displayLabel = hover || rating

  return (
    <div className="flex items-center mt-2">
      {[1, 2, 3, 4, 5].map((i) => {
        const filled = i <= (hover || rating)
        return (
          <button
            key={i}
            type="button"
            disabled={disabled}
            onClick={() => onChange?.(i)}
            onMouseEnter={() => !disabled && setHover(i)}
            onMouseLeave={() => !disabled && setHover(0)}
          >
            {filled ? (
              <IcoStarFill className="w-12 h-12" />
            ) : (
              <IcoStarEmpty className="w-12 h-12" />
            )}
          </button>
        )
      })}
      <span className="ml-2">
        {displayLabel ? labels[displayLabel] : ''}
      </span>
    </div>
  )
}

export default React.memo(StarRatingField)
