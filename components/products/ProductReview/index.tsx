'use client'

import Loading from '@/components/common/Loading'
import Modal from '@/components/common/Modal'
import { IcoEmptyReview } from '@/components/icons'
import StyledHeading from '@/components/ui/StyledHeading'
import { useReviews } from '@/lib/hooks/useReviews'
import React, { useState } from 'react'
import CustomerRating from './CustomerRating'
import { useHasReviewed, useVerifiedBuyer } from './helper'
import ReviewContainer from './ReviewContainer'
import ReviewForm from './ReviewForm'
import TotalRating from './TotalRating'
import ReviewButton from './TotalRating/ReviewButton'

interface ProductReviewProps {
  productId: string
}

const ProductReview: React.FC<ProductReviewProps> = ({ productId }) => {
  const [showForm, setShowForm] = useState(false)
  const { data, setPage, mutate, isLoading } = useReviews(productId)
  const verifiedBuyer = useVerifiedBuyer(productId)
  const { hasReviewed } = useHasReviewed(data.reviews)

  return (
    <div className="main-width">
      <div className="text-center">
        <StyledHeading
          text={'Ratings and Reviews'}
          normalClass="uppercase text-3xl md:text-4xl"
          tangerineClass="font-[tangerine] font-bold text-5xl"
        />
      </div>

      {isLoading ? (
        <div className="min-h-96 flex items-center justify-center">
          <Loading />
        </div>
      ) : !data || data.total === 0 ? (
        <div className="py-16 flex items-center flex-col">
          <IcoEmptyReview className="w-20 h-20" />
          <p className="text-xl md:text-2xl mt-6 md:mt-8">
            We’re looking for stars!
          </p>
          <p className="md:text-lg text-gray-500 mt-4">
            Let us know what you think
          </p>

          <ReviewButton
            onOpenForm={() => setShowForm(true)}
            verifiedBuyer={verifiedBuyer}
            buttonText="Be the first to write a review!"
          />
        </div>
      ) : (
        <>
          <TotalRating
            summary={data.summary}
            onOpenForm={() => setShowForm(true)}
            verifiedBuyer={verifiedBuyer}
            hasReviewed={hasReviewed}
          />
          <CustomerRating performance={data.performance} />
          <ReviewContainer productId={productId} />
        </>
      )}

      <Modal
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        className="w-full md:w-3xl"
      >
        <ReviewForm
          productId={productId}
          onSuccess={() => {
            setPage(1)
            setShowForm(false)
            mutate()
          }}
        />
      </Modal>
    </div>
  )
}

export default ProductReview
