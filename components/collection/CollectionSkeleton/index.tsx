import { Skeleton } from '@/components/ui/Skeleton'

export default function CollectionSkeleton() {
  return (
    <div className="mt-6 md:mt-10">
      <div className="flex justify-between">
        <Skeleton className="h-7 w-20" />
        <div className="flex gap-4">
          <Skeleton className="h-7 w-36 rounded-lg" />
          <Skeleton className="h-7 w-60 rounded-lg" />
        </div>
      </div>
      <div className='flex gap-8 mt-6 md:mt-10'>
        <div className="hidden md:block w-60 shrink-0">
          <Skeleton className="h-6 w-32 mb-4" />
          <div className="space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-full" />
            ))}
          </div>
        </div>

        {/* Product grid */}
        <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-40 w-full rounded-lg" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
