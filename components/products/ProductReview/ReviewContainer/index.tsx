'use client'

import { Reviews } from '@/types/reviews'
import React from 'react'
import ReviewItem from './ReviewItem'
import SearchReview from './SearchReview'
import FilterReview from './FilterReview'

interface ReviewContainerProps {
  reviews: Reviews[]
}

const ReviewContainer: React.FC<ReviewContainerProps> = ({ reviews }) => {
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between mt-8 md:mt-12 border-t pt-8 md:pt-12">
        <SearchReview />
        <FilterReview />
      </div>
      <ReviewItem reviews={reviews} />
    </div>
  )
}

export default ReviewContainer
