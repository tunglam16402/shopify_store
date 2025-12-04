import { Button } from '@/components/ui/Button'
import React from 'react'

interface IReviewPagination {
  page: number
  pageSize: number
  total: number
  onChange: (page: number) => void
}

const ReviewPagination: React.FC<IReviewPagination> = ({
  page,
  pageSize,
  total,
  onChange,
}) => {
  const totalPages = Math.ceil(total / pageSize)

  return (
    <div className="flex items-center justify-center gap-4 mt-8">
      <Button
        variant="outline"
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
      >
        Prev
      </Button>

      <span className="text-sm text-gray-600">
        Page {page} of {totalPages}
      </span>

      <Button
        variant="outline"
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
      >
        Next
      </Button>
    </div>
  )
}

export default ReviewPagination
