'use client'

import PWSwiper, { ONE_ITEMS_BREAKPOINTS } from '@/components/ui/Swiper'
import { HomepageDocumentDataUspItem, Simplify } from '@/prismicio-types'
import { GroupField } from '@prismicio/client'
import React from 'react'
import USPItem from './USPItem'

interface IUSPs {
  usps: GroupField<Simplify<HomepageDocumentDataUspItem>>
}

const USPs: React.FC<IUSPs> = ({ usps }) => {
  return (
    <section className="mt-12">
      <div className="hidden md:grid md:grid-cols-4 md:gap-6">
        {usps?.map((usp) => (
          <USPItem usp={usp} key={usp.title} />
        ))}
      </div>

      <div className="md:hidden">
        <PWSwiper
          pagination={false}
          breakpoints={ONE_ITEMS_BREAKPOINTS}
          navigation={false}
        >
          {usps?.map((usp) => (
            <USPItem usp={usp} key={usp.title} />
          ))}
        </PWSwiper>
      </div>
    </section>
  )
}

export default USPs
