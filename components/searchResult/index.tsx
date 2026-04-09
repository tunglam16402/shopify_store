import { ProductCardProps } from '@/types/product/productCard'
import { cacheLife } from 'next/cache'
import React from 'react'
import { CollectionContent } from '../collection'
import { Facets } from '../collection/type'

interface ISearchResult {
  products: ProductCardProps[]
  query: string
  facets: Facets[]
  globalPrice: Facets[]
}

const SearchResult: React.FC<ISearchResult> = async ({
  products,
  query,
  facets,
  globalPrice,
}) => {
  'use cache'
  cacheLife('hours')

  return (
    <div className="mt-[132px] md:mt-4">
      <div className="layout-width">
        {products.length ? (
          <div>
            <div className="mt-4 md:mt-6">
              <h1 className="text-3xl font-light uppercase md:text-5xl">
                Search Results for:{' '}
                <span className="text-primary">&quot;{query}&quot;</span>
              </h1>
            </div>
            <CollectionContent
              products={products}
              facets={facets}
              globalPrice={globalPrice}
            />
          </div>
        ) : (
          <div>
            <h1 className="text-3xl font-light uppercase md:text-5xl">
              OOPS – NO RESULTS FOR:{' '}
              <span className="text-primary">&quot;{query}&quot;</span>
            </h1>
            <p className="mt-2 text-lg md:mt-4 md:text-xl">
              Dont give up! Check the spelling, or try something less specific.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchResult
