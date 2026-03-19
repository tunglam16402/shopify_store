'use client'

import { PrismicNextImage } from '@prismicio/next'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { HomepageDocumentDataHeroBannersItem } from '@/prismicio-types'
import styles from './style.module.css'

interface IHeroBannerItem {
  data: HomepageDocumentDataHeroBannersItem
}

const HeroBannerItem: React.FC<IHeroBannerItem> = ({ data }) => {
  return (
    <div className={styles.hero_banner_item}>
      <div className="relative h-[60%] md:h-full md:flex-1">
        <PrismicNextImage
          field={data.image}
          fill
          alt=""
          className="object-cover"
          preload
          fetchPriority="high"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      <div className={styles.hero_text}>
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

export default HeroBannerItem
