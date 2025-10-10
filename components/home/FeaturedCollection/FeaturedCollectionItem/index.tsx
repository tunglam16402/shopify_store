'use client'

import { HomepageDocumentDataCollectionsItem } from '@/prismicio-types'
import { PrismicNextImage } from '@prismicio/next'
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
    <div className="relative w-full h-full min-h-[430px] md:min-h-[674px] overflow-hidden mx-3">
      {imageField && (
        <Link href={href}>
          <PrismicNextImage
            field={imageField}
            alt=""
            fill
            className="object-contain w-full"
          />
        </Link>
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30 flex flex-col justify-between items-center text-white p-4">
        <div className="flex flex-col items-center text-center my-auto space-y-2">
          <div className="text-3xl">
            <span className="font-[tangerine] text-4xl capitalize">
              {collection.sub_title_top}
            </span>
            <span className="uppercase"> {collection.title_top},</span>
          </div>
          <div className="text-3xl">
            <span className="uppercase">{collection.title_bottom}</span>
            <span className="font-[tangerine] text-4xl">
              {collection.sub_title_bottom}
            </span>
          </div>
        </div>

        <div className="uppercase">
          <Link href={href} className="text-white px-6">
            {collection.button_text}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default FeaturedCollectionItem
