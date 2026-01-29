'use client'

import Modal from '@/components/common/Modal'
import { IcoDown, Logo } from '@/components/icons'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { useState } from 'react'

interface IPersonalizationHeader {
  onClose: () => void
}

const PersonalizationHeader = ({ onClose }: IPersonalizationHeader) => {
  const [showExitModal, setShowExitModal] = useState(false)
  return (
    <>
      <div className=" fixed top-0 left-0 w-full h-14 border-b flex items-center bg-white">
        <Button
          className="px-4 md:px-8 text-base uppercase ml-4"
          onClick={() => setShowExitModal(true)}
          variant={'default'}
        >
          <IcoDown className="rotate-90 size-6" />
          <div>Exit</div>
        </Button>

        <Link
          href="/"
          className="absolute md:left-1/2 left-3/4 -translate-x-1/2"
        >
          <Logo className="size-40" />
        </Link>
      </div>

      {showExitModal && (
        <div>
          <Modal
            className="p-6 md:p-10 text-center"
            hasClose={false}
            onClose={onClose}
          >
            <h3 className="text-2xl md:text-3xl">
              You are about to exit the page
            </h3>
            <p className="mt-4 text-sm md:text-base">
              Your progress won’t be saved
            </p>
            <div className="mt-8 flex items-center gap-4">
              <Button
                variant={'outline'}
                onClick={onClose}
                className="flex-1 w-full"
              >
                EXIT
              </Button>
              <Button
                variant={'primary'}
                onClick={() => setShowExitModal(false)}
                className="rounded-none flex-1 w-full"
              >
                CONTINUE EDITING
              </Button>
            </div>
          </Modal>
        </div>
      )}
    </>
  )
}

export default PersonalizationHeader
