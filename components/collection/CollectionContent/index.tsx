'use client'

import { useState } from 'react'
import { Activity } from 'react'
import cn from 'classnames'

import { IcoFilter } from '@/components/icons'
import { ProductList } from '@/components/products'
import SortByFilter from '../Filter/SortByFilter'
import Filter from '../Filter'
import { ProductCardProps } from '@/types/product/productCard'
import { TileBanner } from '../Banner'
import { Facets } from '../type'

interface ICollectionContent {
  products: ProductCardProps[]
  tiles?: TileBanner[]
  facets: Facets[]
  globalPrice:Facets[]
}

const CollectionContent: React.FC<ICollectionContent> = ({
  products,
  tiles,
  facets,
  globalPrice
}) => {
  const [showFilter, setShowFilter] = useState(false)

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
          <Filter facets={facets} globalPrice={globalPrice}/>
        </div>

        <div className="flex-1 transition-[margin] duration-300 ease-in-out">
          <ProductList products={products} tiles={tiles} />
        </div>
      </div>
    </div>
  )
}

export default CollectionContent

//       <div
//         className="shrink-0 overflow-hidden transition-[width] duration-300 ease-in-out "
//         style={{ width: showFilter ? 250 : 0 }}
//       >
//         <Activity mode={showFilter ? 'visible' : 'hidden'}>
//           <div
//             className={cn(
//               'w-[250px]',
//               showFilter ? 'translate-x-0 ' : '-translate-x-full'
//             )}
//           >
//             <Filter />
//           </div>
//         </Activity>
//       </div>
