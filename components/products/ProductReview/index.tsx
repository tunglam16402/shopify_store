'use client'

import Modal from '@/components/common/Modal'
import React, { useState } from 'react'
import CustomerRating from './CustomerRating'
import ReviewContainer from './ReviewContainer'
import ReviewForm from './ReviewForm'
import TotalRating from './TotalRating'
import { Button } from '@/components/ui/Button'
import { IcoEmptyReview } from '@/components/icons'
import StyledHeading from '@/components/ui/StyledHeading'
import { useReviews } from '@/lib/hooks/useReviews'

interface ProductReviewProps {
  productId: string
}

const ProductReview: React.FC<ProductReviewProps> = ({ productId }) => {
  const [showForm, setShowForm] = useState(false)
  const { data, setPage, mutate } = useReviews(productId)

  return (
    <div className="main-width">
      <div className="text-center">
        <StyledHeading
          text={'Ratings and Reviews'}
          normalClass="uppercase text-3xl md:text-4xl"
          tangerineClass="font-[tangerine] font-bold text-5xl"
        />
      </div>

      {!data || data.total === 0 ? (
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
          <TotalRating
            summary={data?.summary}
            onOpenForm={() => setShowForm(true)}
          />

          <CustomerRating performance={data?.performance} />

          <ReviewContainer productId={productId} />
        </>
      )}

      <Modal isOpen={showForm} onClose={() => setShowForm(false)}>
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
