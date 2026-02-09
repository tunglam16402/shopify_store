import * as React from 'react'
import cn from 'classnames'

type InputProps = React.ComponentProps<'input'> & {
  label?: string
  required?: boolean
  error?: string
}

export function Input({ label, required, error, value, ...props }: InputProps) {
  const hasError = Boolean(error)
  const hasValue = value !== undefined && value !== ''

  return (
    <div className="w-full">
      <div className="relative">
        <input
          {...props}
          value={value}
          placeholder=" "
          required={required}
          aria-invalid={hasError}
          className={cn(
            'peer h-12 w-full border bg-transparent px-3 text-sm transition-colors outline-none',
            {
              'border-b-2 border-red-500 border-b-red-500': hasError,

              'border-b-2 border-neutral-400 border-b-green-500':
                !hasError && hasValue,

              'border-neutral-400 focus:border-b-2 focus:border-black':
                !hasError && !hasValue,
            }
          )}
        />

        {label && (
          <label
            className={cn(
              'pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 bg-white px-1 text-sm transition-all',
              {
                'text-red-500': hasError,
                'text-green-600': !hasError && hasValue,
                'text-neutral-500': !hasError && !hasValue,

                'peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-xs peer-focus:top-0 peer-focus:text-xs': true,
              }
            )}
          >
            {label}
            {required && <span className="text-red-500"> *</span>}
          </label>
        )}
      </div>

      {hasError && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  )
}
