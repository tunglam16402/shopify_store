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
          <Link href={href} className="group block aspect-9/10">
            <div className="relative h-full w-full overflow-hidden">
              <Image
                src={imageField.url || ''}
                alt=""
                fill
                className="object-contain transition-transform duration-1000 ease-out group-hover:scale-125"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>

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

              <div className="px-6 text-white uppercase hover:underline">
                {collection.button_text}
              </div>
            </div>
          </Link>
        </div>
      )}
    </div>
  )
}

export default FeaturedCollectionItem
