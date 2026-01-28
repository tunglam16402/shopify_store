'use client'

import { IcoClose } from '@/components/icons'
import React, { ReactNode, useEffect } from 'react'
import cn from 'classnames'

interface ModalProps {
  isOpen?: boolean
  onClose?: () => void
  children: ReactNode
  hasClose?: boolean
  className?: string
}

const Modal: React.FC<ModalProps> = ({
  isOpen = 'true',
  onClose,
  children,
  hasClose = 'true',
  className,
}) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/70 z-51"
      onClick={onClose}
    >
      <div
        className={cn(
          'bg-white md:rounded-lg shadow-lg relative max-h-screen overflow-auto',
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {hasClose && (
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-900"
            onClick={onClose}
          >
            <IcoClose className="w-5 h-5" />
          </button>
        )}
        {children}
      </div>
    </div>
  )
}

export default Modal
