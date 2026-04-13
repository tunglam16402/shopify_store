'use client'

import { IcoClose } from '@/components/icons'
import React, { ReactNode, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import cn from 'classnames'

interface ModalProps {
  isOpen?: boolean
  onClose?: () => void
  children: ReactNode
  hasClose?: boolean
  className?: string
  align?: 'center' | 'right' | 'left'
  closeBtnColor?: string
}

const Modal: React.FC<ModalProps> = ({
  isOpen = true,
  onClose,
  children,
  hasClose = true,
  className,
  align = 'center',
  closeBtnColor,
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [shouldRender, setShouldRender] = useState(isOpen)

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsVisible(true)
        })
      })
      document.body.style.overflow = 'hidden'
    } else {
      setIsVisible(false)
      const timer = setTimeout(() => {
        setShouldRender(false)
      }, 200)

      document.body.style.overflow = ''

      return () => clearTimeout(timer)
    }
  }, [isOpen])

  useEffect(() => {
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  if (!shouldRender) return null

  const handleOverlayClick = () => {
    onClose?.()
  }

  const getModalAnimation = () => {
    const base = 'transition-all duration-200 ease-out'

    if (!isVisible) {
      switch (align) {
        case 'right':
          return `${base} translate-x-full opacity-0`
        case 'left':
          return `${base} -translate-x-full opacity-0`
        default:
          return `${base} scale-95 opacity-0`
      }
    }

    return `${base} translate-x-0 scale-100 opacity-100`
  }

  return createPortal(
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-center bg-black/70 transition-opacity duration-200',
        isVisible ? 'opacity-100' : 'opacity-0',
        align === 'center' && 'justify-center',
        align === 'right' && 'justify-end',
        align === 'left' && 'justify-start'
      )}
      onClick={handleOverlayClick}
    >
      <div
        className={cn(
          'relative max-h-dvh overflow-auto bg-white shadow-lg',
          getModalAnimation(),
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {hasClose && (
          <button
            className="absolute top-4 right-4 z-10 rounded text-gray-500 transition-colors hover:text-gray-900"
            onClick={onClose}
            aria-label="Close modal"
          >
            <IcoClose
              className="size-5 transition-transform duration-300 hover:rotate-90 md:size-6"
              color={closeBtnColor}
            />
          </button>
        )}
        {children}
      </div>
    </div>,
    document.body
  )
}

export default Modal
