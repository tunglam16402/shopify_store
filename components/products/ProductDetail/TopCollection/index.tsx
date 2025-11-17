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
    <div className='md:main-width'>
      <div className="text-center">
        <StyledHeading
          text={'DISCOVER our TOP categories'}
          normalClass="uppercase text-3xl md:text-4xl"
          tangerineClass="font-[tangerine] font-bold text-5xl"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {COLLECTION_LIST.map((collection, idx) => (
          <div
            key={idx}
            className="relative w-full group overflow-hidden shadow-lg"
          >
            <Link
              href={collection.pathname}
              className="block relative aspect-[4/5]"
            >
              <Image
                src={collection.image}
                alt={collection.button_text}
                fill
                className="object-cover w-full h-full transition-transform duration-1600 ease-in-out group-hover:scale-120"
                loading="lazy"
              />

              <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-black/50 to-transparent transition-opacity duration-500 group-hover:from-black/80" />

              <div className="absolute bottom-4 w-full text-center">
                <span className="text-white uppercase text-lg font-semibold p-4 underline ">
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
