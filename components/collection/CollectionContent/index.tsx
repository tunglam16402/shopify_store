'use client'

import cn from 'classnames'
import { useEffect, useState } from 'react'

import { IcoFilter } from '@/components/icons'
import { ProductList } from '@/components/products'
import { ProductCardProps } from '@/types/product/productCard'
import { TileBanner } from '../Banner'
import Filter from '../Filter'
import SortByFilter from '../Filter/SortByFilter'
import { Facets } from '../type'
import { useSearchParams } from 'next/navigation'

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

  useEffect(() => {
    if (searchParams.size > 0) {
      setShowFilter(true)
    }
  }, [searchParams])

  return (
    <div>
      <div className="flex justify-between items-center gap-4 mt-6 md:mt-10">
        <div className="text-xl">({products.length} items)</div>
        <div className="flex items-center gap-6">
          <button
            onClick={() => setShowFilter((prev) => !prev)}
            className="flex items-center gap-2"
          >
            <IcoFilter className="w-5 h-5" />
            {showFilter ? 'Hide filters' : 'Show filters'}
          </button>

          <SortByFilter />
        </div>
      </div>

      <div className="mt-6 md:mt-10 flex">
        <div
          className={cn(
            'relative transition-all duration-300 ease-in-out',
            'overflow-hidden shrink-0',
            showFilter
              ? 'w-60 opacity-100 translate-x-0 pr-4 mr-4'
              : 'w-0 opacity-0 -translate-x-4'
          )}
        >
          <Filter facets={facets} globalPrice={globalPrice} />
        </div>

        <div className="flex-1 transition-[margin] duration-300 ease-in-out">
          <ProductList products={products} tiles={tiles} />
        </div>
      </div>
    </div>
  )
}

export default CollectionContent
