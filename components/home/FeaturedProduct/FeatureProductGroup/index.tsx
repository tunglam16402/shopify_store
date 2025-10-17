/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { Carousel } from '@/components/common/Carousel'
import ProductCard from '@/components/products/ProductCard'

interface ClientProps {
  sections: {
    widgetId: string
    section: any
    items: any[]
  }[]
}

const FeaturedProductGroup: React.FC<ClientProps> = ({ sections }) => {
  return (
    <>
      {sections.map(({ widgetId, section, items }) => (
        <div key={widgetId} className="">
          <h2 className="text-3xl md:text-5xl text-center mt-12">
            <span className="uppercase">{section.heading_title}</span>
            {section.sub_title && (
              <span className="font-[tangerine] font-bold text-5xl px-2">
                {section.sub_title}
              </span>
            )}
            {section.heading_title_2 && section.heading_title_2}
          </h2>
          <div className='mt-6'>
            <Carousel
              items={items}
              renderItem={(product) => (
                <ProductCard key={product.id} product={product} />
              )}
              slidesToShow={2}
              itemsToScroll={2}
              loop
              autoPlay={false}
              showDots
              responsiveConfig={[
                { breakpoint: 768, slidesToShow: 2 },
                { breakpoint: 1024, slidesToShow: 3, showArrows: true },
                { breakpoint: 1280, slidesToShow: 4, showArrows: true },
              ]}
            />
          </div>
        </div>
      ))}
    </>
  )
}

export default FeaturedProductGroup
