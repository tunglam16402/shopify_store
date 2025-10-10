'use client'

import {
  HomepageDocumentDataCollectionsItem,
  Simplify,
} from '@/prismicio-types'
import FeaturedCollectionItem from './FeaturedCollectionItem'
import { Carousel } from '@/components/common/Carousel'
import { GroupField } from '@prismicio/client'

interface IFeaturedCollections {
  collections: GroupField<Simplify<HomepageDocumentDataCollectionsItem>>
}

const FeaturedCollections: React.FC<IFeaturedCollections> = ({
  collections,
}) => {
  return (
    <div className="mt-5">
      <Carousel
        items={collections}
        renderItem={(collection) => (
          <FeaturedCollectionItem
            key={collection.pathname}
            collection={collection}
          />
        )}
        slidesToShow={1}
        itemsToScroll={1}
        loop={true}
        autoPlay={false}
        showDots
        responsiveConfig={[
          { breakpoint: 768, slidesToShow: 2 },
          { breakpoint: 1024, slidesToShow: 3, showArrows: true },
          {
            breakpoint: 1280,
            slidesToShow: 3,
            itemsToScroll: 1,
            showArrows: true,
          },
        ]}
      />
      {/* {collections.map((collection) => (
        <FeaturedCollectionItem
          key={collection.pathname}
          collection={collection}
        />
      ))} */}
    </div>
  )
}

export default FeaturedCollections
