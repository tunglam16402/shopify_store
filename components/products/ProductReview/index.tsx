// components/review/ProductReview.tsx
'use client'

import React, { useEffect, useState } from 'react'
import TotalRating from './TotalRating'
import CustomerReview from './CustomerReview'
import ReviewForm from './ReviewForm'
import { Reviews } from '@/types/reviews'

interface ProductReviewProps {
  productId: string
}

const ProductReview: React.FC<ProductReviewProps> = ({ productId }) => {
  const [reviews, setReviews] = useState<Reviews[]>([])
  const [showForm, setShowForm] = useState(false)

  const fetchReviews = async () => {
    try {
      const res = await fetch(`/api/reviews?product_id=${productId}`)
      const data = await res.json()
      setReviews(data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchReviews()
  }, [productId])

  const handleSuccess = () => fetchReviews()

  return (
    <div className="mt-6">
      <h3 className="text-lg font-bold mb-4">Reviews</h3>
      <TotalRating reviews={reviews} onOpenForm={() => setShowForm(true)} />
      <CustomerReview reviews={reviews} />
      {showForm && (
        <ReviewForm
          productId={productId}
          onSuccess={handleSuccess}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  )
}

export default ProductReview
