'use client'

import { HomepageDocumentDataCollectionsItem } from '@/prismicio-types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface IFeaturedCollectionItem {
  collection: HomepageDocumentDataCollectionsItem
}

const FeaturedCollectionItem: React.FC<IFeaturedCollectionItem> = ({
  collection,
}) => {
  const imageField = collection.collection
  const href = collection.pathname || '#'

  return (
    <div className="relative w-full">
      {imageField && (
        <div className="relative w-full">
          <Link href={href} className="block aspect-9/10">
            <div className="relative h-full w-full">
              <Image
                src={imageField.url || ''}
                alt=""
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          </Link>

          <div className="absolute inset-0 flex flex-col items-center justify-between bg-black/30 p-4 text-white">
            <h3 className="my-auto flex flex-col items-center space-y-2 text-center">
              <div className="text-4xl md:text-5xl">
                <span className="font-sub-heading text-5xl capitalize md:text-6xl">
                  {collection.sub_title_top}
                </span>
                <span className="uppercase"> {collection.title_top},</span>
              </div>
              <div className="text-4xl md:text-5xl">
                <span className="uppercase">{collection.title_bottom} </span>
                <span className="font-sub-heading text-5xl md:text-6xl">
                  {collection.sub_title_bottom}
                </span>
              </div>
            </h3>

            <div className="uppercase">
              <Link href={href} className="px-6 text-white">
                {collection.button_text}
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default FeaturedCollectionItem
