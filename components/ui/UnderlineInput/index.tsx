'use client'

import * as React from 'react'
import clsx from 'clsx'

type BaseProps = {
  containerClassName?: string
  className?: string
}

type InputProps = BaseProps &
  React.InputHTMLAttributes<HTMLInputElement> & {
    as?: 'input'
  }

type TextareaProps = BaseProps &
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    as: 'textarea'
  }

export type UnderlineInputProps = InputProps | TextareaProps

const UnderlineInput = React.forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  UnderlineInputProps
>(({ className, containerClassName, as = 'input', ...props }, ref) => {
  const sharedClassName = clsx(
    `
      peer
      w-full
      bg-transparent
      border-0
      border-b
      border-gray-300
      pb-2
      text-sm
      text-gray-900
      placeholder:text-gray-300
      focus:outline-none
    `,
    className
  )

  return (
    <div className={clsx('relative w-full', containerClassName)}>
      {as === 'textarea' ? (
        <textarea
          ref={ref as React.Ref<HTMLTextAreaElement>}
          className={clsx(sharedClassName, 'resize-none')}
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          ref={ref as React.Ref<HTMLInputElement>}
          className={sharedClassName}
          {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
        />
      )}

      <span
        className="
          pointer-events-none
          absolute
          bottom-0
          left-0
          h-px
          w-full
          origin-left
          scale-x-0
          bg-gray-900
          transition-transform
          duration-300
          peer-focus:scale-x-100
        "
      />
    </div>
  )
})

UnderlineInput.displayName = 'UnderlineInput'

export default UnderlineInput