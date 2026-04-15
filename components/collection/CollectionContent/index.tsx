'use client'

import cn from 'classnames'
import { useEffect, useState } from 'react'

import { IcoClose, IcoFilter } from '@/components/icons'
import ProductInfiniteList from '@/components/products/ProductInfiniteList'
import { useFilterProduct } from '@/lib/hooks/useFilterProduct'
import { useMediaQuery } from '@/lib/hooks/useMediaQuery'
import { getCollectionProductsByHandle } from '@/shopify/api/operations/get-collection'
import dynamic from 'next/dynamic'
import { useSearchParams } from 'next/navigation'
import { TileBanner } from '../Banner'
import CollectionSkeleton from '../CollectionSkeleton'
import Filter from '../Filter'
import SortByFilter from '../Filter/SortByFilter'
import { Facets } from '../type'

const FilterMobile = dynamic(() => import('../FilterMobile'), {
  ssr: false,
})

interface ICollectionContent {
  initialData: Awaited<ReturnType<typeof getCollectionProductsByHandle>>
  tiles?: TileBanner[]
  facets: Facets[]
  globalPrice: Facets[]
}

const CollectionContent: React.FC<ICollectionContent> = ({
  initialData,
  tiles,
  facets,
  globalPrice,
}) => {
  const [showFilter, setShowFilter] = useState(false)
  const searchParams = useSearchParams()
  const isDesktop = useMediaQuery('(min-width: 768px)')

  const { isPending, actions } = useFilterProduct()

  useEffect(() => {
    if (isDesktop && searchParams.size > 0) {
      setShowFilter(true)
    }
  }, [searchParams, isDesktop])

  return (
    <div>
      {isPending ? (
        <CollectionSkeleton />
      ) : (
        <>
          <div className="mt-6 flex items-center justify-between gap-4 md:mt-10">
            <div className="hidden text-base md:block md:text-xl">
              ({initialData.products.length} items)
            </div>
            <div className="flex flex-1 items-center gap-2 md:flex-none md:gap-4">
              <button
                onClick={() => setShowFilter((prev) => !prev)}
                className="flex flex-1 items-center gap-2 rounded-lg border border-gray-400 py-2 text-sm md:text-base"
              >
                <IcoFilter className="ml-2 h-5 w-5 md:ml-4" />
                <span className="mr-4">
                  {isDesktop === true
                    ? showFilter
                      ? 'Hide filters'
                      : 'Show filters'
                    : 'Filter'}
                </span>
              </button>
              <div className="flex-1 md:flex-none">
                <SortByFilter />
              </div>
            </div>
          </div>

          <div className="mt-6 flex md:mt-10">
            {isDesktop === false && (
              <FilterMobile
                open={showFilter}
                onClose={() => setShowFilter(false)}
                resultsCount={initialData.products.length}
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <span className="text-xl font-medium uppercase">Filter</span>
                  <button onClick={() => setShowFilter(false)}>
                    <IcoClose className="h-5 w-5" />
                  </button>
                </div>

                <Filter
                  facets={facets}
                  globalPrice={globalPrice}
                  actions={actions}
                />
              </FilterMobile>
            )}

            {isDesktop === true && (
              <div
                className={cn(
                  'shrink-0 transition-all duration-300 ease-in-out',
                  showFilter
                    ? 'mr-8 w-64 translate-x-0 opacity-100'
                    : 'pointer-events-none w-0 -translate-x-full opacity-0'
                )}
              >
                <div className="sticky top-20 max-h-[calc(100dvh-5rem)] w-64 overflow-y-auto">
                  <div className="border-b border-gray-600 pb-3 text-base font-semibold uppercase md:text-xl">
                    Filter
                  </div>

                  <Filter
                    facets={facets}
                    globalPrice={globalPrice}
                    actions={actions}
                  />
                </div>
              </div>
            )}

            <div className="flex-1">
              <ProductInfiniteList initialData={initialData} tiles={tiles} />
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default CollectionContent
