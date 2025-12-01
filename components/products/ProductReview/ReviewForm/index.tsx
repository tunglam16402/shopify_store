'use client'

import { createReviewAction } from '@/actions/review'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { ReviewFormState } from '@/types/reviews'
import React, { useActionState, useEffect, useState } from 'react'
import { OptionSelector } from './SelectField'
import StarRatingField from './StarRatingField'
import UploadMediaField from './UploadMediaField'

interface ReviewFormProps {
  productId: string
  onSuccess?: (reviewId: string) => void
}

const initialState: ReviewFormState = {
  success: false,
  errors: [],
  review: undefined,
}

const ReviewForm: React.FC<ReviewFormProps> = ({
  productId,
  onSuccess,
}) => {
  const [rating, setRating] = useState(0)
  const [ageRange, setAgeRange] = useState<string>('')
  const [recommend, setRecommend] = useState<string>('')
  const [quality, setQuality] = useState(0)
  const [value, setValue] = useState(0)

  const [state, formAction, pending] = useActionState(
    (state: ReviewFormState, formData: FormData) =>
      createReviewAction(state, formData, productId),
    initialState
  )

  useEffect(() => {
    if (state.success && state.review) {
      onSuccess?.(state.review.id)
    }
  }, [state, onSuccess])


  return (
    <div className="pt-4">
      {state.errors && state.errors.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-2">
          <ul className="space-y-1 text-sm text-red-700">
            {state.errors.map((err, i) => (
              <li key={i}>{err.message}</li>
            ))}
          </ul>
        </div>
      )}

      <p className="text-2xl text-center ">Share your thought</p>

      <form action={formAction} className="flex flex-col gap-2 mt-6 ">
        <div className="space-y-8">
          <div>
            <Label htmlFor="rating">Rate your experience *</Label>
            <StarRatingField
              rating={rating}
              disabled={pending}
              onChange={setRating}
            />
            <input type="hidden" name="rating" value={rating} />
          </div>

          <div>
            <Label htmlFor="comment">Write a Review *</Label>
            <textarea
              id="comment"
              name="comment"
              disabled={pending}
              placeholder="Tell us what you like or dislike (max. 100 characters)"
              className="border p-2 h-30 rounded-xl w-full"
              maxLength={100}
              required
            />
          </div>

          <div>
            <Label htmlFor="headline">Add a Headline *</Label>
            <Input
              type="text"
              id="headline"
              name="headline"
              disabled={pending}
              placeholder="Summarize your experience"
              className="h-12"
              required
            />
          </div>

          <div>
            <Label htmlFor="username">Your Name *</Label>
            <Input
              type="text"
              id="username"
              name="username"
              disabled={pending}
              placeholder="Example: Lama"
              className="h-12"
              required
            />
          </div>

          <div>
            <Label htmlFor="email">Your Email address</Label>
            <Input
              type="email"
              id="email"
              name="email"
              disabled={pending}
              placeholder="Example: youremail@gmail.com"
              className="h-12"
              required
            />
          </div>

          <UploadMediaField
            disabled={pending}
            name="media"
            label="Add Media"
          />

          <OptionSelector
            label="How would you rate the quality of this product? (Choose 1)"
            name="quality"
            value={quality}
            options={[1, 2, 3, 4, 5]}
            onChange={setQuality}
          />

          <OptionSelector
            label="How would you rate the value of this product? (Choose 1)"
            name="value"
            value={value}
            options={[1, 2, 3, 4, 5]}
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
        <div className="flex items-center justify-between gap-6 mt-4 md:mt-6">
          <p className="text-sm ">Required fields are marked with *</p>
          <Button
            type="submit"
            disabled={pending}
            variant={'primary'}
            className=" w-[40%] h-12"
          >
            {pending ? 'Sending...' : 'Send Review'}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default ReviewForm
