/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import ProductSwiper from '@/components/products/ProductSwiper'

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
            <ProductSwiper data={items}/>
          </div>
        </div>
      ))}
    </>
  )
}

export default FeaturedProductGroup
