import { Carousel } from '@/components/common/Carousel'
import React from 'react'
import ShowCaseItem from './ShowCaseItem'

const ShowCase = () => {
  return (
    <div className="main-width mt-5">
      {/* <Carousel
        items={products}
        renderItem={(product) => (
          <ProductCard key={product.id} product={product} />
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
      /> */}
      <ShowCaseItem />
    </div>
  )
}

export default ShowCase
