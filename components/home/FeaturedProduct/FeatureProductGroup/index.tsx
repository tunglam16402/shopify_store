'use client'

import ProductSwiper from '@/components/products/ProductSwiper'
import { ProductCardProps } from '@/types/product/productCard'

interface ISection {
  heading_title: string
  sub_title?: string
  heading_title_2?: string
}
interface IFeaturedProductGroup {
  sections: {
    widgetId: string
    section: ISection
    items: ProductCardProps[]
  }[]
}

const FeaturedProductGroup: React.FC<IFeaturedProductGroup> = ({ sections }) => {
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
          <div className="mt-6">
            <ProductSwiper data={items} />
          </div>
        </div>
      ))}
    </>
  )
}

export default FeaturedProductGroup
