'use client'

import { Reviews } from '@/types/reviews'
import Image from 'next/image'
import React from 'react'

interface CustomerReviewProps {
  reviews: Reviews[]
}

const CustomerReview: React.FC<CustomerReviewProps> = ({ reviews }) => {
  if (!reviews || reviews.length === 0) return null

  return (
    <div className="mb-6">
      {reviews.map((r) => (
        <div key={r.id} className="mb-4 border-b pb-2">
          <div className="flex justify-between items-center mb-1">
            <strong>{r.username}</strong>
            <span className="text-sm text-gray-500">
              {r.rating}/5 - {new Date(r.created_at).toLocaleDateString()}
            </span>
          </div>

          <p className="mb-1">{r.comment}</p>
          <p className="mb-1 font-medium">{r.headline}</p>
          <p className="mb-2 text-sm text-gray-600">{r.email}</p>
          <div>
            <span>Age Range: </span>
            <span>{r.age_range}</span>
          </div>

          <div>
            <span>Recommend for friend: </span>
            <span>{r.recommend}</span>
          </div>

          <div>
            <span>Quality: </span>
            <span>{r.quality}</span>
          </div>

          <div>
            <span>Value: </span>
            <span>{r.value}</span>
          </div>

          {r.media?.length > 0 && (
            <div className="flex gap-2 mt-2 flex-wrap">
              {r.media.map((m) =>
                m.type === 'image' ? (
                  <div
                    key={m.id}
                    className="w-20 h-20 relative rounded overflow-hidden"
                  >
                    <Image
                      src={m.url}
                      alt="review media"
                      width={80}
                      height={80}
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
      ))}
    </div>
  )
}

export default CustomerReview
