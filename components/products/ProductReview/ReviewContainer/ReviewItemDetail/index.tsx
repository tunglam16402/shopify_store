import ExpandableText from '@/components/common/ExpandableText'
import { IcoStarEmpty, IcoStarFill, IcoVerify } from '@/components/icons'
import PWSwiper from '@/components/ui/Swiper'
import { Reviews } from '@/types/reviews'
import Image from 'next/image'
import React, { Suspense } from 'react'
import RatingBar from '../../CustomerRating/RatingBar'
import VoteReview from '../ReviewItem/VoteReview'

interface IReviewItemDetail {
  review: Reviews
  startIndex: number
}

const ReviewItemDetail: React.FC<IReviewItemDetail> = ({
  review,
  startIndex,
}) => {
  return (
    <div className="mt-12 flex flex-col gap-4 md:mt-0 md:flex-row">
      <div className="w-full md:w-[520px]">
        <Suspense fallback={null}>
          <PWSwiper
            pagination={false}
            navigation={false}
            initialSlide={startIndex}
            breakpoints={{
              0: { slidesPerView: 1, slidesPerGroup: 1 },
            }}
          >
            {review.review_media.map((media) =>
              media.type === 'image' ? (
                <div
                  className="relative h-[600px] w-full bg-black md:h-[720px] md:w-[520px]"
                  key={media.id}
                >
                  <Image
                    src={media.url}
                    alt="review media"
                    fill
                    sizes="max-width: 100vw, 40vw"
                    className="object-contain"
                  />
                </div>
              ) : (
                <video
                  key={media.id}
                  src={media.url}
                  controls
                  className="h-40 w-40 rounded"
                />
              )
            )}
          </PWSwiper>
        </Suspense>
      </div>
      <div className="p-4">
        <div className="flex justify-between md:flex-col">
          <div>
            <strong>{review.username}</strong>
            <div className="flex items-center gap-1">
              <IcoVerify className="h-5 w-5" />
              <p className="text-gray-700">Verified Buyer</p>
            </div>
          </div>

          <span className="text-sm font-medium text-gray-500 md:mt-4">
            {new Date(review.created_at).toLocaleDateString()}
          </span>
        </div>

        <div className="mt-4 -ml-2 flex md:mt-4">
          {[...Array(review.rating)].map((_, i) => (
            <IcoStarFill key={`full-${i}`} className="h-9 w-9" />
          ))}
          {[...Array(5 - review.rating)].map((_, i) => (
            <IcoStarEmpty key={`empty-${i}`} className="h-9 w-9" />
          ))}
        </div>

        <div>
          <p className="mt-2 text-xl font-medium md:mt-4">{review.headline}</p>
          <ExpandableText
            text={review.comment}
            lineClamp={6}
            className="mt-4"
          />
        </div>
        {review.quality !== 0 && review.value !== 0 && (
          <div className="mt-5 space-y-5">
            <RatingBar label="Quality of this product" value={review.quality} />
            <RatingBar label="Value of this product" value={review.value} />
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

        <VoteReview
          reviewId={review.id}
          initialVoteUp={review.vote_up}
          initialVoteDown={review.vote_down}
        />
      </div>
    </div>
  )
}

export default ReviewItemDetail
