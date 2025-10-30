'use client'

import React from 'react'
import { HomepageDocumentDataUspItem, Simplify } from '@/prismicio-types'
import { GroupField } from '@prismicio/client'
import USPItem from './USPItem'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/Carousel'

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
