import PWSwiper from '@/components/ui/Swiper'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface IShopByCategory {
  subCategories: {
    title: string
    url: string
    image?: string
  }[]
}

const COLLECTION_BREAKPOINT = {
  0: {
    slidesPerView: 2,
    slidesPerGroup: 2,
    spaceBetween: 8,
  },
  768: {
    slidesPerView: 4,
    slidesPerGroup: 4,
    spaceBetween: 12,
  },
  1024: {
    slidesPerView: 7,
    slidesPerGroup: 7,
    spaceBetween: 16,
  },
}

const ShopByCategory = ({ subCategories }: IShopByCategory) => {
  if (!subCategories || subCategories.length === 0) return null

  return (
    <PWSwiper pagination={false} breakpoints={COLLECTION_BREAKPOINT}>
      {subCategories.map((subCategory) => (
        <Link
          href={subCategory.url}
          key={subCategory.url}
          className="relative h-28 md:h-32 w-full inline-block"
        >
          <Image
            src={subCategory.image || ''}
            alt=""
            fill
            className="object-cover rounded-sm md:rounded-lg "
            sizes="(max-width: 768px) 20vw, 40vw"
          />
          {!!subCategory.title && (
            <>
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-sm md:rounded-lg"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(0,0,0,0) 44.71%, rgba(0,0,0,0.6) 85.1%)',
                }}
              />
              <span className="absolute bottom-2 left-2 text-sm font-medium text-white md:bottom-4 md:left-4 md:text-lg">
                {subCategory.title}
              </span>
            </>
          )}
        </Link>
      ))}
    </PWSwiper>
  )
}

export default ShopByCategory
