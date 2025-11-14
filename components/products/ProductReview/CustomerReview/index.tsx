// components/review/CustomerReview.tsx
'use client'

import { Reviews } from '@/types/reviews'
import React from 'react'

interface CustomerReviewProps {
  reviews: Reviews[]
}

const CustomerReview: React.FC<CustomerReviewProps> = ({ reviews }) => {
  return (
    <div className="mb-6">
      {reviews.map((r) => (
        <div key={r.id} className="mb-2 border-b pb-2">
          <strong>{r.username}</strong> ({r.rating}/5) -{' '}
          {new Date(r.created_at).toLocaleDateString()}
          <p>{r.comment}</p>
        </div>
      ))}
    </div>
  )
}

export default CustomerReview
