'use client'

import Modal from '@/components/common/Modal'
import { Reviews } from '@/types/reviews'
import React, { Activity, useEffect, useState } from 'react'
import CustomerReview from './ReviewContainer'
import ReviewForm from './ReviewForm'
import TotalRating from './TotalRating'
import CustomerRating from './CustomerRating'

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

  return (
    <div className="main-width">
      <h3 className="text-2xl font-light uppercase text-center">
        Ratings and Reviews
      </h3>

      <TotalRating reviews={reviews} onOpenForm={() => setShowForm(true)} />

      <CustomerRating reviews={reviews} />

      <CustomerReview reviews={reviews} />
{/* 
      <Activity mode={showForm ? 'visible' : 'hidden'}>
        <Modal onClose={() => setShowForm(false)}>
          <ReviewForm
            productId={productId}
            onSuccess={() => fetchReviews()}
            onClose={() => setShowForm(false)}
          />
        </Modal>
      </Activity> */}

      <Modal isOpen={showForm} onClose={() => setShowForm(false)}>
        <ReviewForm
          productId={productId}
          onSuccess={() => fetchReviews()}
          onClose={() => setShowForm(false)}
        />
      </Modal>
    </div>
  )
}

export default ProductReview
