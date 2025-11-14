// components/review/ReviewForm.tsx
'use client'

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { useActionState } from 'react'
import { createReviewAction } from '@/actions/review'
import { ReviewFormState } from '@/types/reviews'

interface ReviewFormProps {
  productId: string
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
  onSuccess,
  onClose,
}) => {
  const [username, setUsername] = useState('')
  const [comment, setComment] = useState('')
  const [rating, setRating] = useState(5)

  const [state, formAction, pending] = useActionState(
    (state: ReviewFormState, formData: FormData) =>
      createReviewAction(state, formData, productId),
    initialState
  )

  useEffect(() => {
    if (state.success && state.review) {
      setUsername('')
      setComment('')
      setRating(5)
      onSuccess?.(state.review.id)
      onClose?.()
    }
  }, [state, onSuccess, onClose])

  return (
    <div className="border-t pt-4">
      {state.errors && state.errors.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-2">
          <ul className="space-y-1 text-sm text-red-700">
            {state.errors.map((err, i) => (
              <li key={i}>{err.message}</li>
            ))}
          </ul>
        </div>
      )}
      <form action={formAction} className="flex flex-col gap-2">
        <div className="space-y-2">
          <Label htmlFor="username">Name</Label>
          <Input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={pending}
            placeholder="Your name"
            className="h-12"
          />

          <Label htmlFor="comment">Comment</Label>
          <textarea
            id="comment"
            name="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            disabled={pending}
            placeholder="Your review"
            className="border p-2 rounded-xl w-full"
          />

          <Label htmlFor="rating">Rating</Label>
          <select
            id="rating"
            name="rating"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            disabled={pending}
            className="border p-2 rounded-xl w-full"
          >
            {[5, 4, 3, 2, 1].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>

        <Button type="submit" disabled={pending} className="mt-4 w-full h-12">
          {pending ? 'Submitting...' : 'Submit Review'}
        </Button>
      </form>
    </div>
  )
}

export default ReviewForm
