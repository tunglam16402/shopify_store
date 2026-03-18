'use client'

import ExpandableText from '@/components/common/ExpandableText'
import { IcoStarFill, IcoVerify } from '@/components/icons'
import Image from 'next/image'
import { FC } from 'react'
import { HomepageReview, HomepageReviewProduct } from '../type'
import Link from 'next/link'

interface Props {
  review: HomepageReview
  product?: HomepageReviewProduct
}

const HomeReviewItem: FC<Props> = ({ review, product }) => {
  return (
    <div className="flex h-full min-h-[352px] w-full max-w-[440px] flex-col rounded-sm border-2 border-gray-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-center gap-1">
          <span className="font-medium">{review.username}</span>
          <div className="flex items-center">
            <IcoVerify className="size-4" />
            <p className="text-sm text-gray-400">Verified Buyer</p>
          </div>
        </div>
        <span className="text-xs text-gray-400">
          {new Date(review.createdAt).toLocaleDateString()}
        </span>
      </div>

      <div className="mt-2 flex items-center">
        {[...Array(review.rating)].map((_, i) => (
          <IcoStarFill
            key={`full-${i}`}
            className="size-5 scale-135 md:size-6"
            color="black"
          />
        ))}
      </div>

      <p className="mt-4 text-lg leading-snug text-gray-700">
        {review.headline}
      </p>

      <ExpandableText
        text={review.comment}
        lineClamp={4}
        className="mt-2 text-sm text-gray-400"
      />

      {product && (
        <Link href={`/products/${product.handle}`} className="mt-auto block">
          <div className="mt-4 flex items-center gap-2 border-t border-gray-100">
            <div className="relative h-9 w-9 shrink-0">
              {product.image && (
                <Image
                  src={product.image.url}
                  alt={product.image.altText || product.title}
                  fill
                  className="rounded-sm object-cover"
                />
              )}
            </div>

            <span className="line-clamp-2 text-sm text-gray-400 md:text-base">
              {product.title}
            </span>
          </div>
        </Link>
      )}
    </div>
  )
}

export default HomeReviewItem
