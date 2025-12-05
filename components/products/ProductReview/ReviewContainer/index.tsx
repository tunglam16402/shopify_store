'use client'

import React from 'react'
import ReviewItem from './ReviewItem'
import SearchReview from './SearchReview'
import FilterReview from './FilterReview'
import { Button } from '@/components/ui/Button'
import ReviewSummary from './ReviewSummary'
import SortReview from './SortReview'
import ReviewPagination from './ReviewPagiantion'
import { useReviews } from '@/lib/hooks/useReviews'

interface ReviewContainerProps {
  productId: string
}

const ReviewContainer: React.FC<ReviewContainerProps> = ({ productId }) => {
  const {
    data,
    loading,
    search,
    setSearch,
    filters,
    setFilters,
    sort,
    setSort,
    page,
    setPage,
  } = useReviews(productId)

  if (!data) {
    return (
      <div className="py-10 text-center text-gray-500">Loading reviews...</div>
    )
  }

  const start = (page - 1) * data.limit + 1
  const end = Math.min(page * data.limit, data.total)

  const { reviews, summary, total } = data

  console.log('reviews :>> ', reviews);

  const handleClear = () => {
    setSearch('')
    setFilters({})
    setSort('newest')
    setPage(1)
  }

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-col justify-between my-8 md:my-12 md:mb-8 border-t border-b py-8 md:py-12">
        {/* 🔍 Search */}
        {/* <SearchReview
          value={search}
          onSearch={(value) => {
            setSearch(value)
            setPage(1)
          }}
        /> */}

        {/* 🧹 Filter */}
        <FilterReview filters={filters} setFilters={setFilters} />

        {/* Summary + Sort */}
        <div className="flex flex-col md:flex-row justify-between md:items-center mt-4 md:mt-8">
          {/* <ReviewSummary start={start} end={end} total={summary} /> */}

          <SortReview
            value={sort}
            onChange={(value: string) => {
              setSort(value)
              setPage(1)
            }}
          />
        </div>
      </div>

      {/* No results */}
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
          {/* List */}
          {loading ? (
            <p className="text-gray-500 text-center py-6">Loading...</p>
          ) : (
            reviews.map((review: any) => (
              <ReviewItem key={review.id} review={review} />
            ))
          )}

          {/* Pagination */}
          <ReviewPagination
            page={page}
            pageSize={10}
            total={total}
            onChange={(p) => setPage(p)}
          />
        </>
      )}
    </div>
  )
}

export default ReviewContainer
