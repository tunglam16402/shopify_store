'use client'

import * as React from 'react'
import clsx from 'clsx'

export interface UnderlineInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  containerClassName?: string
}

const UnderlineInput = React.forwardRef<HTMLInputElement, UnderlineInputProps>(
  ({ className, containerClassName, ...props }, ref) => {
    return (
      <div className={clsx('relative w-full', containerClassName)}>
        <input
          ref={ref}
          className={clsx(
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
          )}
          {...props}
        />
        <span
          className="
          pointer-events-none
          absolute
          left-0
          bottom-0
          h-px
          w-full
          scale-x-0
          bg-gray-900
          transition-transform
          duration-300
          origin-left
          peer-focus:scale-x-100
        "
        />
      </div>
    )
  }
)

UnderlineInput.displayName = 'UnderlineInput'

export default UnderlineInput
