import Modal from '@/components/common/Modal'
import { Button } from '@/components/ui/Button'
import React from 'react'

interface IPersonalizationConfirmModal {
  title: string
  description?: string

  confirmText?: string
  cancelText?: string

  onConfirm: () => void
  onCancel: () => void
}

const PersonalizationConfirmModal = ({
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
}: IPersonalizationConfirmModal) => {
  return (
    <Modal
      className="p-6 text-center md:p-10"
      hasClose={false}
      onClose={onCancel}
    >
      <h3 className="text-2xl md:text-3xl">{title}</h3>

      {description && (
        <p className="mt-4 text-sm whitespace-pre-line md:text-base">
          {description}
        </p>
      )}

      <div className="mt-8 flex items-center gap-4">
        <Button
          variant="outline"
          onClick={onConfirm}
          className="w-full min-w-52 flex-1"
        >
          {confirmText}
        </Button>

        <Button
          variant="primary"
          onClick={onCancel}
          className="w-full min-w-52 flex-1 rounded-none"
        >
          {cancelText}
        </Button>
      </div>
    </Modal>
  )
}

export default PersonalizationConfirmModal
