import { Skeleton } from '@/components/ui/Skeleton'
import React from 'react'

type ProductListSkeletonProps = {
  length?: number
  cols?: {
    mob?: number
    des?: number
  }
  className?: string
}

const ProductListSkeleton = ({
  length = 8,
  cols = { mob: 2, des: 4 },
  className = '',
}: ProductListSkeletonProps) => {
  return (
    <div
      className={`flex-1 grid gap-4 grid-cols-${cols.mob} md:grid-cols-${cols.des} ${className}`}
    >
      {Array.from({ length }).map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="min-h-[470px] w-full rounded-none" />
          <Skeleton className="h-5 w-2/5" />
          <Skeleton className="h-10 w-4/5" />
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-7 w-16" />
        </div>
      ))}
    </div>
  )
}

export default ProductListSkeleton
