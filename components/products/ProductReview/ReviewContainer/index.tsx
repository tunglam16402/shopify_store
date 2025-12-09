'use client'

import { Button } from '@/components/ui/Button'
import { useReviews } from '@/lib/hooks/useReviews'
import { Reviews } from '@/types/reviews'
import React from 'react'
import FilterReview from './FilterReview'
import ReviewItem from './ReviewItem'
import ReviewPagination from './ReviewPagination'
import ReviewSummary from './ReviewSummary'
import SearchReview from './SearchReview'
import SortReview from './SortReview'

interface ReviewContainerProps {
  productId: string
}

const ReviewContainer: React.FC<ReviewContainerProps> = ({ productId }) => {
  const {
    data,
    search,
    setSearch,
    filters,
    setFilters,
    sort,
    setSort,
    page,
    isLoading,
    setPage,
  } = useReviews(productId)

  console.log('productId :>> ', productId);

  console.log('data :>> ', data)

  if (isLoading) {
    return (
      <div className="py-10 text-center text-gray-500">Loading reviews...</div>
    )
  }

  const start = (page - 1) * data.limit + 1
  const end = Math.min(page * data.limit, data.total)

  const { reviews, total } = data

  const handleClear = () => {
    setSearch('')
    setFilters({})
    setSort('revelant')
    setPage(1)
  }

  return (
    <div>
      <div className="flex flex-col justify-between my-8 md:my-12 md:mb-8 border-t border-b py-8 md:py-12">
        <SearchReview
          value={search}
          onSearch={(value) => {
            setSearch(value)
            setPage(1)
          }}
        />

        <FilterReview filters={filters} setFilters={setFilters} />

        <div className="flex flex-col md:flex-row justify-between md:items-center mt-4 md:mt-8">
          <ReviewSummary start={start} end={end} total={total} />

          <SortReview
            value={sort}
            onChange={(value: string) => {
              setSort(value)
              setPage(1)
            }}
          />
        </div>
      </div>

      {total === 0 ? (
        <div className="text-center w-full">
          <p className="text-gray-500 text-base md:text-lg">
            No matching reviews
          </p>
          <p>Try clearing or changing the filters</p>

          <Button
            onClick={handleClear}
            variant="primary"
            className="mt-6 md:mt-8 text-base md:text-lg md:py-6 md:px-10 rounded-3xl"
          >
            Clear Filter
          </Button>
        </div>
      ) : (
        <>
          {reviews.map((review: Reviews) => (
            <ReviewItem key={review.id} review={review} />
          ))}

          <ReviewPagination
            page={page}
            pageSize={data.limit}
            total={total}
            onChange={(p) => setPage(p)}
          />
        </>
      )}
    </div>
  )
}

export default ReviewContainer
