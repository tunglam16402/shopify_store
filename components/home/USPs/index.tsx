'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem
} from '@/components/ui/Carousel'
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
      <div className="hidden md:grid md:grid-cols-3 md:gap-6">
        {usps?.map((usp) => (
          <USPItem usp={usp} key={usp.title} />
        ))}
      </div>

      <div className="md:hidden">
        <Carousel opts={{ align: 'center', loop: true }}>
          <CarouselContent>
            {usps?.map((usp) => (
              <CarouselItem key={usp.title} >
                <USPItem usp={usp} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  )
}

export default USPs
