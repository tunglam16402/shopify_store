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
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  
  const [state, formAction, pending] = useActionState(
    (state: ReviewFormState, formData: FormData) =>
      createReviewAction(state, formData, productId),
    initialState
  )

  useEffect(() => {
    if (state.success && state.review) {
      onSuccess?.(state.review.id)
      onClose?.()
    }
  }, [state, onSuccess, onClose])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    
    if (files.length > 3) {
      alert('You can choose maximum 3 files')
      e.target.value = '' 
      return
    }

    for (const file of files) {
      const maxSize = file.type.startsWith('video') ? 100 * 1024 * 1024 : 5 * 1024 * 1024
      if (file.size > maxSize) {
        alert(`File ${file.name} exceeding the allowable size`)
        e.target.value = ''
        return
      }
    }

    setSelectedFiles(files)
  }

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
      
      <p className="text-xl text-center font-light uppercase">
        Share your thought
      </p>
      
      <form action={formAction} className="flex flex-col gap-2">
        <div className="space-y-2">
          <div>
            <Label htmlFor="rating">Rate your experience *</Label>
            <select
              id="rating"
              name="rating"
              disabled={pending}
              className="border p-2 rounded-xl w-full"
              defaultValue={5}
            >
              {[5, 4, 3, 2, 1].map((n) => (
                <option key={n} value={n}>
                  {'⭐'.repeat(n)} ({n} stars)
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label htmlFor="comment">Write a Review *</Label>
            <textarea
              id="comment"
              name="comment"
              disabled={pending}
              placeholder="Tell us what you like or dislike (min. 10 characters)"
              className="border p-2 h-30 rounded-xl w-full"
              minLength={10}
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
            />
          </div>

          <div>
            <Label htmlFor="media">Add Media (Optional)</Label>
            <Input
              type="file"
              id="media"
              name="media"
              multiple 
              accept="image/*,video/*" 
              disabled={pending}
              onChange={handleFileChange}
              className="h-12"
            />
            <p className='text-xs mt-2 text-gray-600'>
              Upload up to 3 images (max. 5MB each) or 1 video (max. 100MB).
            </p>
            
            {selectedFiles.length > 0 && (
              <div className="mt-2 space-y-1">
                {selectedFiles.map((file, idx) => (
                  <div key={idx} className="text-xs text-gray-700 flex items-center gap-2">
                    <span>📎</span>
                    <span>{file.name}</span>
                    <span className="text-gray-500">
                      ({(file.size / 1024 / 1024).toFixed(2)} MB)
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <Button type="submit" disabled={pending} className="mt-4 w-full h-12">
          {pending ? 'Submitting...' : 'Submit Review'}
        </Button>
      </form>
    </div>
  )
}

export default ReviewForm