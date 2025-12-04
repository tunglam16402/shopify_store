'use client'

import Modal from '@/components/common/Modal'
import { Reviews } from '@/types/reviews'
import React, { useEffect, useState } from 'react'
import CustomerRating from './CustomerRating'
import CustomerReview from './ReviewContainer'
import ReviewForm from './ReviewForm'
import TotalRating from './TotalRating'
import { Button } from '@/components/ui/Button'
import { IcoEmptyReview } from '@/components/icons'
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

  return (
    <div className="main-width">
      <div className="text-center">
        <StyledHeading
          text={'Ratings and Reviews'}
          normalClass="uppercase text-3xl md:text-4xl"
          tangerineClass="font-[tangerine] font-bold text-5xl"
        />
      </div>

      {reviews.length === 0 ? (
        <div className="py-16 flex items-center flex-col">
          <IcoEmptyReview className="w-20 h-20" />
          <p className="text-xl md:text-2xl mt-6 md:mt-8">
            We’re looking for stars!
          </p>
          <p className="md:text-lg text-gray-500 mt-4">
            Let us know what you think
          </p>
          <Button
            onClick={() => setShowForm(true)}
            variant={'primary'}
            className="mt-6 md:mt-8 text-base md:text-lg py-6 rounded-3xl"
          >
            Be the first to write a review!
          </Button>
        </div>
      ) : (
        <>
          <TotalRating reviews={reviews} onOpenForm={() => setShowForm(true)} />

          <CustomerRating reviews={reviews} />

          <CustomerReview reviews={reviews} />
        </>
      )}

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
