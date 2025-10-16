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
        <section key={widgetId} className="">
          <h2 className="text-3xl md:text-5xl text-center mt-4">
            <span className="uppercase">{section.heading_title}</span>
            {section.sub_title && (
              <span className="font-[tangerine] font-bold text-5xl px-2">
                {section.sub_title}
              </span>
            )}
            {section.heading_title_2 && section.heading_title_2}
          </h2>
          <video
            playsInline
            autoPlay
            muted
            loop
            width="800"
            height="740"
            preload="none"
          >
            <source
              src="https://cdn.shopify.com/videos/c/o/v/ea4656ae3bca451ea82dea87b80ff64a.mp4"
              type="video/mp4"
            />
          </video>

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
        </section>
      ))}
    </>
  )
}

export default FeaturedProductGroup
