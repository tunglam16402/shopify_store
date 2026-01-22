import { Skeleton } from '@/components/ui/Skeleton'

export default function CollectionSkeleton() {
  return (
    <div className="mt-6 md:mt-10">
      {/* Filter */}
      <div className="flex justify-between">
        <Skeleton className="h-7 w-20" />
        <div className="flex gap-4">
          <Skeleton className="h-11 w-36 rounded-lg" />
          <Skeleton className="h-11 w-60 rounded-lg" />
        </div>
      </div>
      <div className="flex gap-10 mt-6 md:mt-10">
        <div className="hidden md:block w-64 shrink-0">
          <Skeleton className="h-7 w-20" />
          <Skeleton className="h-px w-full mt-4" />
          <div>
            <Skeleton className="h-6 w-12 mt-4" />
            <div className="flex justify-between">
              <Skeleton className="h-9 w-28 mt-4" />
              <Skeleton className="h-9 w-28 mt-4" />
            </div>
            <Skeleton className="h-9 w-full mt-8" />
          </div>

          <Skeleton className="h-px w-full mt-6" />

          {Array.from({ length: 3 }).map((_, sectionIndex) => (
            <div key={sectionIndex} className="space-y-3 mt-6">
              <Skeleton className="h-7 w-24 mt-6" />

              <div className="mt-8 space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex gap-3">
                    <Skeleton className="h-6 w-6 rounded-none" />
                    <Skeleton className="h-6 w-full" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Product grid */}
        <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="min-h-[380px] w-full rounded-md" />
              <Skeleton className="h-5 w-2/5" />
              <Skeleton className="h-10 w-4/5" />
              <Skeleton className="h-7 w-16" />
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-9 w-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
