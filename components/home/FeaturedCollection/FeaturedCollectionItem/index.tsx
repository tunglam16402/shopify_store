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
          <Link href={href} className="block aspect-[9/10]">
            <Image
              src={imageField.url || ""}
              alt=""
              fill
              className="w-full h-auto object-contain"
              loading="lazy"
            />
          </Link>

          <div className="absolute inset-0 bg-black/30 flex flex-col justify-between items-center text-white p-4">
            <h3 className="flex flex-col items-center text-center my-auto space-y-2">
              <div className="text-4xl md:text-5xl">
                <span className="font-sub-heading text-5xl md:text-6xl capitalize">
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
              <Link href={href} className="text-white px-6">
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