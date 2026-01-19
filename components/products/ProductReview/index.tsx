'use client'

import React, { useState, Suspense, lazy, useMemo } from 'react'
import Loading from '@/components/common/Loading'
import Modal from '@/components/common/Modal'
import { IcoEmptyReview } from '@/components/icons'
import StyledHeading from '@/components/ui/StyledHeading'
import { useReviews } from '@/lib/hooks/useReviews'
import CustomerRating from './CustomerRating'
import { useMyReviewed, useVerifiedBuyer } from './helper'
import ReviewForm from './ReviewForm'
import TotalRating from './TotalRating'
import ReviewButton from './TotalRating/ReviewButton'

const ReviewContainer = lazy(() => import('./ReviewContainer'))
interface ProductReviewProps {
  productId: string
}

const ProductReview: React.FC<ProductReviewProps> = ({ productId }) => {
  const [showForm, setShowForm] = useState(false)

  const { data, setPage, mutate, isLoading } = useReviews(productId)

  const verifiedBuyer = useVerifiedBuyer(productId)
  const { hasReviewed, myReview } = useMyReviewed(data?.reviews ?? [])

  return (
    <div className="main-width">
      {/* Heading */}
      <div className="text-center">
        <StyledHeading
          text="Ratings and Reviews"
          headingClass="uppercase text-3xl md:text-[42px]"
          subHeadingClass="font-sub-heading font-bold text-4xl md:text-5xl"
        />
      </div>

      {isLoading && (
        <div className="min-h-96 flex items-center justify-center">
          <Loading />
        </div>
      )}
      {!isLoading && !(data?.summary?.totalReviews > 0) && (
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
      )}
      {!isLoading && data?.summary?.totalReviews > 0 && (
        <>
          {data?.summary && (
            <TotalRating
              summary={data.summary}
              onOpenForm={() => setShowForm(true)}
              verifiedBuyer={verifiedBuyer}
              hasReviewed={hasReviewed}
            />
          )}
          {data?.performance && (
            <CustomerRating performance={data.performance} />
          )}

          <Suspense
            fallback={
              <div className="py-8">
                <Loading />
              </div>
            }
          >
            <ReviewContainer
              myReview={myReview}
              productId={productId}
              onOpenForm={() => setShowForm(true)}
            />
          </Suspense>
        </>
      )}

      <Modal
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        className="w-full md:w-3xl"
      >
        <ReviewForm
          productId={productId}
          hasReviewed={myReview}
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
