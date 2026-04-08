'use client'

import { Button } from '@/components/ui/Button'
import { HomepageDocumentDataBannersItem } from '@/prismicio-types'
import { PrismicNextImage } from '@prismicio/next'
import Link from 'next/link'

interface IGiftGuideItem {
  data: HomepageDocumentDataBannersItem
}

const GiftGuideItem: React.FC<IGiftGuideItem> = ({ data }) => {
  return (
    <div className="md:h-dvh flex h-[calc(100dvh-100px)] flex-col gap-8 md:flex-row md:gap-0">
      <div className="relative h-[60%] md:h-full md:flex-1">
        <PrismicNextImage
          field={data.image}
          fill
          alt=""
          className="object-cover"
          loading="lazy"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      <div className="flex flex-1 flex-col items-center px-8 text-center md:justify-center md:px-3">
        <h1 className="text-5xl font-light text-white md:text-7xl">
          {data.title}
          {data.lower_title && (
            <span className="font-sub-heading px-2 text-6xl">
              {data.lower_title}
            </span>
          )}
          {data.title_2 && data.title_2}
        </h1>

        {data.text && (
          <span className="mt-6 text-center font-semibold text-white md:px-8 md:text-lg">
            {data.text}
          </span>
        )}

        {data.button_text && (
          <Link href={data.pathname || '#'}>
            <Button
              className="mt-8 px-12 text-lg uppercase md:mt-10 md:px-18"
              variant={'rollingText'}
            >
              {data.button_text}
            </Button>
          </Link>
        )}
      </div>
    </div>
  )
}

export default GiftGuideItem
