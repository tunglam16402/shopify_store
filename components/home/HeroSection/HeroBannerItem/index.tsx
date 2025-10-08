/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { PrismicNextImage } from '@prismicio/next'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

interface IHeroBannerItem {
  data: any
  index: number
}

const HeroBannerItem: React.FC<IHeroBannerItem> = ({ data, index }) => {
  return (
    <div
      key={data.banner_id || index}
      className="relative h-[60%] md:flex-1 md:h-full"
    >
      <PrismicNextImage
        field={data.image}
        fill
        className="object-cover"
        priority={index === 0}
      />

      <div className="flex flex-1 h-[40%] flex-col items-center px-8 md:h-full md:justify-center md:px-3">
        <h1 className="text-white font-extralight text-5xl md:text-6xl">
          {data.title}
          {data.sub_title && (
            <span className="font-[tangerine] text-6xl px-2">
              {data.sub_title}
            </span>
          )}
        </h1>

        {data.cta_text && (
          <Link href={data.link?.url || '#'}>
            <Button className="uppercase mt-6 px-12 md:px-16">
              {data.cta_text}
            </Button>
          </Link>
        )}
      </div>
    </div>
  )
}

export default HeroBannerItem
