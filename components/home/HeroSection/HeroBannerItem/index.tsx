'use client'

import { Button } from '@/components/ui/Button'
import { HomepageDocumentDataHeroBannersItem } from '@/prismicio-types'
import { PrismicNextImage } from '@prismicio/next'
import Link from 'next/link'

interface IHeroBannerItem {
  heroBannerData: HomepageDocumentDataHeroBannersItem
  firstBanner?: boolean
}

const HeroBannerItem: React.FC<IHeroBannerItem> = ({
  heroBannerData,
  firstBanner,
}) => {
  return (
    <div className="relative md:h-auto">
      <picture>
        <source
          media="(max-width: 768px)"
          srcSet={heroBannerData.image?.mobile.url?.split('?')?.[0]}
        />
        <PrismicNextImage
          field={heroBannerData.image}
          width={heroBannerData.image.dimensions?.width}
          height={heroBannerData.image.dimensions?.height}
          alt=""
          className="object-contain"
          preload={firstBanner}
          fetchPriority={firstBanner ? 'high' : 'auto'}
          loading={firstBanner ? 'eager' : 'lazy'}
          imgixParams={{ auto: ['enhance'] }}
          sizes=" 100vw"
        />
      </picture>
      <div className="absolute inset-0 hidden bg-linear-to-r from-black/50 via-transparent to-transparent md:block"></div>

      <div className="absolute top-1/2 left-8 hidden w-full max-w-4xl -translate-y-1/2 transform text-white md:block">
        <h1 className="mb-4 text-4xl leading-tight font-light tracking-wide md:text-[80px]">
          {heroBannerData.title}
        </h1>
        <p className="mb-6 text-lg md:text-2xl">{heroBannerData.subtitle}</p>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 transform md:bottom-10">
        <Link href={heroBannerData.ctalink || '#'}>
          <Button
            variant={'rollingText'}
            className="border-white bg-transparent px-16 text-base text-white md:px-28 md:text-lg"
          >
            {heroBannerData.ctatext}
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default HeroBannerItem
