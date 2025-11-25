'use client'

import { IcoClose } from '@/components/icons'
import React, { ReactNode, useEffect } from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-white md:rounded-lg shadow-lg p-6 relative max-w-lg h-[100vh] w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-900"
          onClick={onClose}
        >
          <IcoClose className='w-5 h-5'/>
        </button>
        {children}
      </div>
    </div>
  )
}

export default Modal
