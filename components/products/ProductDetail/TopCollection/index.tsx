'use client'

import StyledHeading from '@/components/ui/StyledHeading'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

// types.ts
interface ICollectionItem {
  image: string
  pathname: string
  button_text: string
}

const COLLECTION_LIST: ICollectionItem[] = [
  {
    image: '/assets/collection/game_category_detail.webp',
    pathname: '/collections/games',
    button_text: 'Games',
  },
  {
    image: '/assets/collection/album_category_detail.webp',
    pathname: '/collections/phôt-albums',
    button_text: 'Photo Albums',
  },
  {
    image: '/assets/collection/kitchen_category_detail.webp',
    pathname: '/collections/kitchen-essentials',
    button_text: 'Kitchen Essentials',
  },
]

const TopCollection: React.FC = () => {
  return (
    <div className="mx-auto w-full md:max-w-[1360px]">
      <div className="text-center">
        <StyledHeading
          text={'DISCOVER our TOP categories'}
          headingClass="uppercase text-3xl md:text-[42px]"
          subHeadingClass="font-sub-heading font-bold text-4xl md:text-5xl"
        />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-2 md:mt-6 md:grid-cols-3 md:gap-4">
        {COLLECTION_LIST.map((collection, idx) => (
          <div
            key={idx}
            className="group relative w-full overflow-hidden shadow-lg"
          >
            <Link
              href={collection.pathname}
              className="relative block aspect-4/5"
            >
              <Image
                src={collection.image}
                alt={collection.button_text}
                fill
                className="h-full w-full object-cover transition-transform duration-1600 ease-in-out group-hover:scale-120"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 25vw"
              />

              <div className="absolute bottom-0 left-0 h-1/4 w-full bg-linear-to-t from-black/50 to-transparent transition-opacity duration-500 group-hover:from-black/80" />

              <div className="absolute bottom-4 w-full p-2 text-center">
                <span className="border-b p-1 text-lg text-white uppercase">
                  {collection.button_text}
                </span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TopCollection
