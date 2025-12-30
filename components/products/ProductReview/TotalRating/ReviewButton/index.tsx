import Modal from '@/components/common/Modal'
import { IcoReviewBuy } from '@/components/icons'
import { Button } from '@/components/ui/Button'
import { RootState } from '@/store/store'
import Link from 'next/link'
import { useState } from 'react'
import { useSelector } from 'react-redux'

const ReviewButton = ({
  verifiedBuyer,
  onOpenForm,
  buttonText = 'Write a review',
  hasReviewed,
}: {
  verifiedBuyer: boolean
  onOpenForm: () => void
  buttonText?: string
  hasReviewed?: boolean
}) => {
  const [showModal, setShowModal] = useState(false)
  const { customer } = useSelector((state: RootState) => state.user)

  const handleOpenReviewForm = () => {
    if (verifiedBuyer) {
      onOpenForm()
    } else {
      setShowModal(true)
    }
  }

  const handleUpdateReview = () => {

  }

  return (
    <div className="text-center mt-4 md:mt-0">
      {!hasReviewed ? (
        <Button
          variant="primary"
          onClick={handleOpenReviewForm}
          className="px-8 md:px-12 md:py-5 md:text-base capitalize font-semibold"
        >
          {buttonText}
        </Button>
      ) : (
        <Button
          variant="primary"
          onClick={handleUpdateReview}
          className="px-8 md:px-12 md:py-5 md:text-base capitalize font-semibold"
        >
          Update your review
        </Button>
      )}

      {showModal && !verifiedBuyer && (
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          hasClose={false}
          className="rounded-2xl md:w-3xl"
        >
          <div>
            <span className="text-2xl md:text-3xl font-medium">
              You cannot write review yet
            </span>
            <IcoReviewBuy className="w-36 h-36 md:w-40 md:h-40 mt-10 md:mt-12 animate-bounce mx-auto" />
            <p className="mt-4 md:mt-8 text-base md:text-lg text-gray-600">
              Please purchase this product first to leave a review.
            </p>
            <div className="flex justify-center gap-4 mt-6 md:mt-8">
              <Button
                className="text-lg md:text-xl px-10 py-6 rounded-4xl"
                variant={'primary'}
              >
                {customer ? (
                  <div onClick={() => setShowModal(false)}>
                    Continue Shopping
                  </div>
                ) : (
                  <Link href={'/account/login'}>Go to Login</Link>
                )}
              </Button>

              <Button
                variant="secondary"
                className="text-lg md:text-xl px-10 py-6 rounded-4xl"
                onClick={() => setShowModal(false)}
              >
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}

export default ReviewButton
