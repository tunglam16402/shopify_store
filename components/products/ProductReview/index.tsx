'use client'

import { Reviews } from '@/types/reviews'
import React, { useEffect, useState, Activity } from 'react'
import CustomerReview from './CustomerReview'
import ReviewForm from './ReviewForm'
import TotalRating from './TotalRating'
import Modal from '@/components/common/Modal'
import SearchReview from './SearchReview'
import FilterReview from './FilterReview'

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
      <div className='flex flex-col md:flex-row justify-between mt-8 md:mt-12 border-t pt-8 md:pt-12'>
        <SearchReview />
        <FilterReview />
      </div>

      <CustomerReview reviews={reviews} />

      <Activity mode={showForm ? 'visible' : 'hidden'}>
        <Modal onClose={() => setShowForm(false)}>
          <ReviewForm productId={productId} onSuccess={() => fetchReviews()} />
        </Modal>
      </Activity>
    </div>
  )
}

export default ProductReview
