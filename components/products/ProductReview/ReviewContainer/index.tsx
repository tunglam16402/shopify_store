'use client'

import { Reviews } from '@/types/reviews'
import React, { useMemo, useState } from 'react'
import ReviewItem from './ReviewItem'
import SearchReview from './SearchReview'
import FilterReview from './FilterReview'
import { Button } from '@/components/ui/Button'
import ReviewSummary from './ReviewSummary'
import SortReview from './SortReview'
import ReviewPagination from './ReviewPagiantion'

interface ReviewContainerProps {
  reviews: Reviews[]
}

const ReviewContainer: React.FC<ReviewContainerProps> = ({ reviews }) => {
  const [keyword, setKeyword] = useState('')
  const [page, setPage] = useState(1)
  const pageSize = 10

  const filteredReviews = useMemo(() => {
    if (!keyword.trim()) return reviews

    const q = keyword.toLowerCase()
    return reviews.filter((r) => {
      const headline = r.headline?.toLowerCase() || ''
      const comment = r.comment?.toLowerCase() || ''
      return headline.includes(q) || comment.includes(q)
    })
  }, [keyword, reviews])

  // reset page when filter changes
  React.useEffect(() => {
    setPage(1)
  }, [keyword])

  const total = filteredReviews.length
  const start = (page - 1) * pageSize
  const end = Math.min(start + pageSize, total)
  const paginated = filteredReviews.slice(start, end)

  if (!reviews || reviews.length === 0) return null

  return (
    <div>
      <div className="flex flex-col justify-between my-8 md:my-12 md:mb-8 border-t border-b py-8 md:py-12">
        <SearchReview onSearch={setKeyword} />
        <FilterReview />

        <div className="flex flex-col md:flex-row justify-between md:items-center mt-4 md:mt-8">
          <ReviewSummary start={start + 1} end={end} total={total} />
          <SortReview />
        </div>
      </div>

      {total === 0 ? (
        <div className="text-center w-full">
          <p className="text-gray-500 text-base md:text-lg">No matching reviews</p>
          <p>Try clearing or changing the filters</p>
          <Button
            onClick={() => setKeyword('')}
            variant={'primary'}
            className="mt-6 md:mt-8 text-base md:text-lg md:py-6 md:px-10 rounded-3xl"
          >
            Clear Filter
          </Button>
        </div>
      ) : (
        <>
          {paginated.map((review) => (
            <ReviewItem review={review} key={review.id} />
          ))}

          <ReviewPagination
            page={page}
            pageSize={pageSize}
            total={total}
            onChange={setPage}
          />
        </>
      )}
    </div>
  )
}

export default ReviewContainer
