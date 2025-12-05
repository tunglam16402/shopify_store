'use client'

import {
  IcoFlag,
  IcoStarEmpty,
  IcoStarFill,
  IcoThumbUp,
} from '@/components/icons'
import IcoThumbDown from '@/components/icons/Reviews/IcoThumbDown'
import { Reviews } from '@/types/reviews'
import Image from 'next/image'
import RatingBar from '../../CustomerRating/RatingBar'
import ExpandableText from '@/components/common/ExpandableText'

interface ReviewContainerProps {
  review: Reviews
}

const ReviewItem = ({ review }: ReviewContainerProps) => {
  return (
      <div key={review.id} className="mb-8 border-b pb-4 md:pb-8 ">
        <div className="grid grid-cols-1 md:grid-cols-5 md:gap-16">
          <div className="md:col-span-3">
            <div className="flex justify-between md:flex-col">
              <strong>{review.username}</strong>
              <span className="text-sm font-medium text-gray-500">
                {new Date(review.created_at).toLocaleDateString()}
              </span>
            </div>
            <div className="flex mt-2">
              {[...Array(review.rating)].map((_, i) => (
                <IcoStarFill key={`full-${i}`} className="h-7 w-7" />
              ))}
              {[...Array(5 - review.rating)].map((_, i) => (
                <IcoStarEmpty key={`empty-${i}`} className="h-7 w-7" />
              ))}
            </div>

            <div>
              <p className="font-medium text-xl mt-2">{review.headline}</p>
              <ExpandableText
                text={review.comment}
                lineClamp={6}
                className="mt-4"
              />
            </div>

            {review.review_media?.length > 0 && (
              <div className="flex gap-2 mt-5 flex-wrap">
                {review.review_media.map((m) =>
                  m.type === 'image' ? (
                    <div
                      key={m.id}
                      className="w-32 h-32 md:w-40 md:h-40 relative rounded overflow-hidden"
                    >
                      <Image
                        src={m.url}
                        alt="review media"
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <video
                      key={m.id}
                      src={m.url}
                      controls
                      className="w-40 h-40 rounded"
                    />
                  )
                )}
              </div>
            )}
          </div>

          <div className="md:col-span-2">
            {review.quality && review.value && (
              <div className="space-y-5 mt-5 md:mt-0">
                <RatingBar
                  label="Quality of this product"
                  value={review.quality}
                />
                <div className="md:mt-8">
                  <RatingBar
                    label="Value of this product"
                    value={review.value}
                  />
                </div>
              </div>
            )}
            {review.recommend && (
              <div className="mt-5 md:mt-8">
                <span className="text-sm font-medium md:text-base">
                  Would you recommend this product?:
                </span>
                <strong> {review.recommend}</strong>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center mt-10 gap-6">
          {/* <span>Was this review helpful? </span> */}
          <span className="flex items-center gap-1">
            <IcoThumbUp className="w-5 h-5" /> (9)
          </span>
          <span className="flex items-center gap-1">
            <IcoThumbDown className="w-5 h-5" /> (2)
          </span>
          <span className="flex items-center text-sm">
            <IcoFlag className="w-5 h-5" /> Flag
          </span>
        </div>
      </div>
  )
}

export default ReviewItem
