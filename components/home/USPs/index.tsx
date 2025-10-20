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
    <section className="px-4 py-6">
      <h2 className="text-3xl md:text-5xl text-center mt-12">
        <span className="uppercase">featured </span>
        <span className="font-[tangerine] font-bold text-5xl px-2">in</span>
      </h2>
      <div className="hidden md:grid md:grid-cols-3 md:gap-6">
        {usps?.map((usp) => (
          <USPItem usp={usp} key={usp.title} />
        ))}
      </div>

      {/* 📱 Mobile layout */}
      <div className="md:hidden">
        <Carousel opts={{ align: 'start', loop: true }}>
          <CarouselContent>
            {usps?.map((usp) => (
              <CarouselItem key={usp.title} className="basis-[80%]">
                <USPItem usp={usp} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  )
}

export default USPs
