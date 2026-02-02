'use client'

import { IcoDown, Logo } from '@/components/icons'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { useState } from 'react'
import PersonalizationConfirmModal from '../PersonalizationConfirmModal'

interface IPersonalizationHeader {
  onClose: () => void
}

const PersonalizationHeader = ({ onClose }: IPersonalizationHeader) => {
  const [showExitModal, setShowExitModal] = useState(false)
  return (
    <>
      <div className="fixed top-0 left-0 flex h-14 w-full items-center border-b bg-white">
        <Button
          className="ml-4 px-4 text-base uppercase md:px-8"
          onClick={() => setShowExitModal(true)}
          variant={'default'}
        >
          <IcoDown className="size-6 rotate-90" />
          <div>Exit</div>
        </Button>

        <Link
          href="/"
          className="absolute left-3/4 -translate-x-1/2 md:left-1/2"
        >
          <Logo className="size-40" />
        </Link>
      </div>

      {showExitModal && (
        <PersonalizationConfirmModal
          title="You are about to exit the page"
          description="Your progress won’t be saved"
          cancelText="EXIT"
          confirmText="CONTINUE EDITING"
          onConfirm={() => setShowExitModal(false)}
          onCancel={onClose}
        />
      )}
    </>
  )
}

export default PersonalizationHeader
