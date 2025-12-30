'use client'

import React, { useActionState, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'

import { createReviewAction, updateReviewAction } from '@/actions/review'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { ReviewFormState, Reviews } from '@/types/reviews'

import { OptionSelector } from './SelectField'
import StarRatingField from './StarRatingField'
import UploadMediaField from './UploadMediaField'

interface ReviewFormProps {
  productId: string
  hasReviewed?: Reviews | null
  onSuccess?: (reviewId: string) => void
  onClose?: () => void
}

const initialState: ReviewFormState = {
  success: false,
  errors: [],
  review: undefined,
}

const ReviewForm: React.FC<ReviewFormProps> = ({
  productId,
  hasReviewed,
  onSuccess,
  onClose,
}) => {
  const router = useRouter()

  const isUpdate = Boolean(hasReviewed?.id)

  const [rating, setRating] = useState(0)
  const [ageRange, setAgeRange] = useState('')
  const [recommend, setRecommend] = useState('')
  const [quality, setQuality] = useState('')
  const [value, setValue] = useState('')

  const [state, formAction, pending] = useActionState(
    (state: ReviewFormState, formData: FormData) => {
      if (isUpdate && hasReviewed?.id) {
        return updateReviewAction(state, formData, hasReviewed.id)
      }
      return createReviewAction(state, formData, productId)
    },
    initialState
  )

  useEffect(() => {
    if (!hasReviewed) return

    setRating(hasReviewed.rating)
    setAgeRange(hasReviewed.age_range ?? '')
    setRecommend(hasReviewed.recommend ?? '')
    setQuality(hasReviewed.quality ?? '')
    setValue(hasReviewed.value ?? '')
  }, [hasReviewed])

  useEffect(() => {
    if (!state.success) return

    router.refresh()

    const reviewId =
      state.review?.id ?? hasReviewed?.id

    if (reviewId) {
      onSuccess?.(reviewId)
    }

    onClose?.()
  }, [state, router, onSuccess, onClose, hasReviewed])


  return (
    <div className="pt-4">
      {/* Errors */}
      {state.errors && state.errors.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
          <ul className="space-y-1 text-sm text-red-700">
            {state.errors.map((err, i) => (
              <li key={i}>{err.message}</li>
            ))}
          </ul>
        </div>
      )}

      <p className="text-2xl text-center">
        {isUpdate ? 'Update your review' : 'Share your thought'}
      </p>

      <form action={formAction} className="flex flex-col gap-2 mt-6">
        <div className="space-y-8">
          {/* Rating */}
          <div>
            <Label>Rate your experience *</Label>
            <StarRatingField
              rating={rating}
              disabled={pending}
              onChange={setRating}
            />
            <input type="hidden" name="rating" value={rating} />
          </div>

          {/* Comment */}
          <div>
            <Label htmlFor="comment">Write a Review *</Label>
            <textarea
              id="comment"
              name="comment"
              disabled={pending}
              defaultValue={hasReviewed?.comment}
              placeholder="Tell us what you like or dislike (min. 10 characters)"
              className="border p-2 h-30 rounded-xl w-full"
              minLength={10}
              required
            />
          </div>

          {/* Headline */}
          <div>
            <Label htmlFor="headline">Add a Headline *</Label>
            <Input
              id="headline"
              name="headline"
              disabled={pending}
              defaultValue={hasReviewed?.headline}
              placeholder="Summarize your experience"
              className="h-12"
              required
            />
          </div>

          {/* Username */}
          <div>
            <Label htmlFor="username">Your Name *</Label>
            <Input
              id="username"
              name="username"
              disabled={pending}
              defaultValue={hasReviewed?.username}
              placeholder="Example: Lama"
              className="h-12"
              required
            />
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email">Your Email address</Label>
            <Input
              type="email"
              id="email"
              name="email"
              disabled={pending}
              defaultValue={hasReviewed?.email ?? ''}
              placeholder="Example: youremail@gmail.com"
              className="h-12"
            />
          </div>

          {/* Media upload (new only for now) */}
          <UploadMediaField
            disabled={pending}
            name="media"
            label="Add Media"
          />

          <OptionSelector
            label="How would you rate the quality of this product? (Choose 1)"
            name="quality"
            value={quality}
            options={['1', '2', '3', '4', '5']}
            onChange={setQuality}
          />

          <OptionSelector
            label="How would you rate the value of this product? (Choose 1)"
            name="value"
            value={value}
            options={['1', '2', '3', '4', '5']}
            onChange={setValue}
          />

          <OptionSelector
            label="What is your Age Range? (Choose 1)"
            name="age_range"
            value={ageRange}
            options={['<18', '18-25', '26-35', '36-45', '46-55', '56+']}
            onChange={setAgeRange}
          />

          <OptionSelector
            label="Would you recommend this product to a friend? (Choose 1)"
            name="recommend"
            value={recommend}
            options={['Yes', 'No']}
            onChange={setRecommend}
          />
        </div>

        <div className="flex items-center justify-between gap-6 mt-6">
          <p className="text-sm">Required fields are marked with *</p>
          <Button
            type="submit"
            disabled={pending || rating === 0}
            variant="primary"
            className="w-[40%] h-12"
          >
            {pending
              ? 'Saving...'
              : isUpdate
              ? 'Update Review'
              : 'Send Review'}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default ReviewForm
