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

  return (
    <div className="mt-4 md:mt-0">
      <Button
        variant="primary"
        onClick={handleOpenReviewForm}
        className="px-8 font-semibold capitalize md:px-12 md:py-5 md:text-base"
      >
        {hasReviewed ? 'Update your review' : buttonText}
      </Button>

      {showModal && !verifiedBuyer && (
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          hasClose={false}
          className="flex flex-col items-center justify-center rounded-2xl! p-6 md:w-3xl"
        >
          <div>
            <span className="text-2xl font-medium md:text-3xl">
              You cannot write review yet
            </span>
            <IcoReviewBuy className="mx-auto mt-10 h-36 w-36 animate-bounce md:mt-12 md:h-40 md:w-40" />
            <p className="mt-4 text-base text-gray-600 md:mt-8 md:text-lg">
              Please purchase this product first to leave a review.
            </p>
            <div className="mt-6 flex justify-center gap-4 md:mt-8">
              <Button
                className="rounded-4xl px-10 py-6 text-lg md:text-xl"
                variant={'rollingText'}
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
                className="rounded-4xl px-10 py-6 text-lg md:text-xl"
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
