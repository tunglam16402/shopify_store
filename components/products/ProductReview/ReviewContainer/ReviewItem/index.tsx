'use client'

import ExpandableText from '@/components/common/ExpandableText'
import Modal from '@/components/common/Modal'
import { IcoStarEmpty, IcoStarFill, IcoVerify } from '@/components/icons'
import { cn } from '@/lib/utils'
import { Reviews } from '@/types/reviews'
import Image from 'next/image'
import { memo, useState } from 'react'
import RatingBar from '../../CustomerRating/RatingBar'
import ReviewItemDetail from '../ReviewItemDetail'
import DeleteReviewButton from './DeleteReviewButton'
import VoteReview from './VoteReview'

interface ReviewItemProps {
  review: Reviews
  isMyReview?: boolean
  onOpenForm?: () => void
  onDeleted: () => void
}

const ReviewItem = ({
  review,
  isMyReview,
  onOpenForm,
  onDeleted,
}: ReviewItemProps) => {
  const [open, setOpen] = useState(false)
  const [startIndex, setStartIndex] = useState(0)

  return (
    <div
      className={cn(
        'mb-8 border-b pb-4 md:pb-8',
        isMyReview && 'rounded-xl border px-4'
      )}
    >
      {isMyReview && (
        <div className="mb-4">
          <div className="flex justify-between border-b pt-3 pb-4 text-sm md:text-base">
            <div className="text-primary font-medium">Your review</div>
            {isMyReview && (
              <div className="flex gap-3 underline">
                <button onClick={onOpenForm}>Update</button>
                <DeleteReviewButton
                  reviewId={review.id}
                  onSuccess={onDeleted}
                />
              </div>
            )}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-5 md:gap-16">
        <div className="md:col-span-3">
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

          <div className="mt-2 flex md:mt-4">
            {[...Array(review.rating)].map((_, i) => (
              <IcoStarFill key={`full-${i}`} className="h-7 w-7" />
            ))}
            {[...Array(5 - review.rating)].map((_, i) => (
              <IcoStarEmpty key={`empty-${i}`} className="h-7 w-7" />
            ))}
          </div>

          <div>
            <p className="mt-2 text-xl font-medium md:mt-4">
              {review.headline}
            </p>
            <ExpandableText
              text={review.comment}
              lineClamp={6}
              className="mt-4"
            />
          </div>

          {review.review_media?.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {review.review_media.map((m, index) =>
                m.type === 'image' ? (
                  <div
                    key={m.id}
                    onClick={() => {
                      setStartIndex(index)
                      setOpen(true)
                    }}
                    className="relative h-32 w-32 overflow-hidden rounded md:h-40 md:w-40"
                  >
                    <Image
                      src={m.url}
                      alt="review media"
                      fill
                      className="cursor-pointer object-cover"
                      sizes="(max-width: 768px) 33vw, 20vw"
                    />
                  </div>
                ) : (
                  <video
                    key={m.id}
                    src={m.url}
                    controls
                    className="h-40 w-40 rounded"
                  />
                )
              )}
            </div>
          )}
        </div>

        <div className="md:col-span-2">
          {review.quality !== 0 && review.value !== 0 && (
            <div className="mt-5 space-y-5 md:mt-0">
              <RatingBar
                label="Quality of this product"
                value={review.quality}
              />
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
        </div>
      </div>

      <VoteReview
        reviewId={review.id}
        initialVoteUp={review.vote_up}
        initialVoteDown={review.vote_down}
      />
      {/* review detail */}
      {open && (
        <Modal
          isOpen={open}
          onClose={() => setOpen(false)}
          className="w-full md:w-4xl"
        >
          <ReviewItemDetail review={review} startIndex={startIndex} />
        </Modal>
      )}
    </div>
  )
}

export default memo(ReviewItem)
