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
        isMyReview && 'border rounded-xl px-4'
      )}
    >
      {isMyReview && (
        <div className="mb-4">
          <div className="flex justify-between pt-3 pb-4 border-b text-sm md:text-base">
            <div className="font-medium text-primary">Your review</div>
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
                <IcoVerify className="w-5 h-5" />
                <p className="text-gray-700">Verified Buyer</p>
              </div>
            </div>

            <span className="text-sm font-medium text-gray-500 md:mt-4">
              {new Date(review.created_at).toLocaleDateString()}
            </span>
          </div>

          <div className="flex mt-2 md:mt-4">
            {[...Array(review.rating)].map((_, i) => (
              <IcoStarFill key={`full-${i}`} className="h-7 w-7" />
            ))}
            {[...Array(5 - review.rating)].map((_, i) => (
              <IcoStarEmpty key={`empty-${i}`} className="h-7 w-7" />
            ))}
          </div>

          <div>
            <p className="font-medium text-xl mt-2 md:mt-4">
              {review.headline}
            </p>
            <ExpandableText
              text={review.comment}
              lineClamp={6}
              className="mt-4"
            />
          </div>

          {review.review_media?.length > 0 && (
            <div className="flex gap-2 mt-5 flex-wrap">
              {review.review_media.map((m, index) =>
                m.type === 'image' ? (
                  <div
                    key={m.id}
                    onClick={() => {
                      setStartIndex(index)
                      setOpen(true)
                    }}
                    className="w-32 h-32 md:w-40 md:h-40 relative rounded overflow-hidden"
                  >
                    <Image
                      src={m.url}
                      alt="review media"
                      fill
                      className="object-cover cursor-pointer"
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
          {review.quality !== 0 && review.value !== 0 && (
            <div className="space-y-5 mt-5 md:mt-0">
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
