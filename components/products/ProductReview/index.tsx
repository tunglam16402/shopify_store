// components/review/ProductReview.tsx
'use client'

import React, { useEffect, useState } from 'react'
import TotalRating from './TotalRating'
import CustomerReview from './CustomerReview'
import ReviewForm from './ReviewForm'
import { Reviews } from '@/types/reviews'
import StyledHeading from '@/components/ui/StyledHeading'

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
    <div className='main-width'>
      <h3 className="text-2xl font-light uppercase text-center">Customer Reviews</h3>
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
