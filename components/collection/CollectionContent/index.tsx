'use client'

import cn from 'classnames'
import { useEffect, useState } from 'react'

import { IcoClose, IcoFilter } from '@/components/icons'
import { ProductList } from '@/components/products'
import { ProductCardProps } from '@/types/product/productCard'
import { TileBanner } from '../Banner'
import SortByFilter from '../Filter/SortByFilter'
import { Facets } from '../type'
import { useSearchParams } from 'next/navigation'
import Filter from '../Filter'
import dynamic from 'next/dynamic'
import { useMediaQuery } from '@/lib/hooks/useMediaQuery'
import { useFilterProduct } from '@/lib/hooks/useFilterProduct'
import CollectionSkeleton from '../CollectionSkeleton'

const FilterMobile = dynamic(() => import('../FilterMobile'), {
  ssr: false,
})

interface ICollectionContent {
  products: ProductCardProps[]
  tiles?: TileBanner[]
  facets: Facets[]
  globalPrice: Facets[]
}

const CollectionContent: React.FC<ICollectionContent> = ({
  products,
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
          <div className="flex justify-between items-center gap-4 mt-6 md:mt-10">
            <div className="md:text-xl text-base hidden md:block">
              ({products.length} items)
            </div>
            <div className="flex items-center gap-2 md:gap-4 flex-1 md:flex-none">
              <button
                onClick={() => setShowFilter((prev) => !prev)}
                className="flex flex-1 items-center gap-2 text-sm md:text-base border rounded-lg py-2 border-gray-400"
              >
                <IcoFilter className="w-5 h-5 ml-2 md:ml-4" />
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

          <div className="mt-6 md:mt-10 flex">
            {isDesktop === false && (
              <FilterMobile
                open={showFilter}
                onClose={() => setShowFilter(false)}
                resultsCount={products.length}
              >
                <div className="flex items-center justify-between pb-4 border-b">
                  <span className="text-xl uppercase font-medium">Filter</span>
                  <button onClick={() => setShowFilter(false)}>
                    <IcoClose className="w-5 h-5" />
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
                  'transition-all duration-300 ease-in-out shrink-0',
                  showFilter
                    ? 'w-60 mr-8 translate-x-0 opacity-100'
                    : 'w-0 -translate-x-full opacity-0 pointer-events-none'
                )}
              >
                <div className="w-60">
                  <div className="border-b uppercase text-base md:text-lg border-gray-600 pb-3">
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
              <ProductList products={products} tiles={tiles} />
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default CollectionContent
