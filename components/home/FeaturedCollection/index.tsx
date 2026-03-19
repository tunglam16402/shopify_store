'use client'

import PWSwiper from '@/components/ui/Swiper'
import {
  HomepageDocumentDataCollectionsItem,
  Simplify,
} from '@/prismicio-types'
import { GroupField } from '@prismicio/client'
import FeaturedCollectionItem from './FeaturedCollectionItem'
import { Suspense } from 'react'

interface IFeaturedCollections {
  collections: GroupField<Simplify<HomepageDocumentDataCollectionsItem>>
}

const COLLECTION_HOME_BREAKPOINT = {
  0: {
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 8,
  },
  768: {
    slidesPerView: 2,
    slidesPerGroup: 1,
    spaceBetween: 8,
  },
  1024: {
    slidesPerView: 3,
    slidesPerGroup: 1,
    spaceBetween: 24,
  },
}

const FeaturedCollections: React.FC<IFeaturedCollections> = ({
  collections,
}) => {
  return (
    <div className="mx-3 mt-5 md:mx-5">
      <PWSwiper breakpoints={COLLECTION_HOME_BREAKPOINT} pagination={false}>
        {collections.map((collection) => (
          <FeaturedCollectionItem
            key={collection.pathname}
            collection={collection}
          />
        ))}
      </PWSwiper>
    </div>
  )
}

export default FeaturedCollections
