'use client'

import { useState, useTransition } from 'react'
import Modal from '@/components/common/Modal'
import { Button } from '@/components/ui/Button'
import { deleteReviewAction } from '@/actions/review'

interface IDeleteReviewButton {
  reviewId: string
  onSuccess: () => void
}

const DeleteReviewButton = ({ reviewId, onSuccess }: IDeleteReviewButton) => {
  const [showModal, setShowModal] = useState(false)
  const [isPending, startTransition] = useTransition()

  const handleDelete = () => {
    startTransition(async () => {
      const res = await deleteReviewAction(reviewId)

      if (res.success) {
        setShowModal(false)
        onSuccess?.()
      } else {
        alert(res.error || 'Failed to delete review')
      }
    })
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="text-sm text-red-500 font-medium"
      >
        Delete
      </button>

      {showModal && (
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          hasClose={false}
          className="rounded-2xl md:w-3xl"
        >
          <div className="text-center">
            <span className="text-2xl md:text-3xl font-medium">
              Delete your review?
            </span>

            <p className="mt-4 md:mt-8 text-base md:text-lg text-gray-600">
              This action cannot be undone.
            </p>

            <div className="flex justify-center gap-4 mt-6 md:mt-8">
              <Button
                variant="secondary"
                className="text-lg md:text-xl px-10 py-6 rounded-4xl"
                onClick={() => setShowModal(false)}
                disabled={isPending}
              >
                Cancel
              </Button>

              <Button
                variant="primary"
                className="text-lg md:text-xl px-10 py-6 rounded-4xl"
                onClick={handleDelete}
                disabled={isPending}
              >
                {isPending ? 'Deleting...' : 'Delete'}
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  )
}

export default DeleteReviewButton
