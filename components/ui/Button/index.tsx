import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium cursor-pointer transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: 'bg-white border border-gray-500 text-black hover:bg-gray-100',
        defaultOutline:
          'bg-black border border-white text-white shadow-xs hover:bg-white hover:text-black hover:border-black',
        primary:
          'border group relative overflow-hidden border-primary bg-primary text-white hover:text-primary hover:bg-white! hover:border-primary',
        destructive:
          'bg-black text-white hover:bg-white hover:text-black border hover:border-black',
        outline:
          'bg-white border border-black text-black shadow-xs hover:bg-primary hover:text-white',
        secondary:
          'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
        ghost:
          'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        link: 'text-primary underline-offset-4 hover:underline',
        underline: `
          bg-transparent text-black dark:text-white
          after:content-[''] after:absolute after:left-0 after:bottom-0
          after:h-[1.5px] after:w-0 after:bg-[#f89540]
          after:transition-all after:duration-300 after:ease-out
          hover:after:w-full
        `,
        rollingText: `
          group
          relative
          overflow-hidden
          bg-white
          border border-black
          text-black
          px-6
          hover:bg-black
          hover:text-white
        `,
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

type ButtonProps = React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }

function Button({
  className,
  variant,
  size,
  asChild = false,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button'

  const isRollingText =
    (variant === 'rollingText' || variant === 'primary') &&
    (typeof children === 'string' || typeof children === 'number')

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {isRollingText ? (
        <span className="relative block h-[1.2em] overflow-hidden leading-none">
          <span
            aria-hidden="true"
            className="block transition-transform duration-800 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-[1.6em]"
          >
            {children}
          </span>

          <span
            aria-hidden="true"
            className="absolute top-[1.6em] left-0 block w-full transition-transform duration-800 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-[1.6em]"
          >
            {children}
          </span>

          <span className="sr-only">{children}</span>
        </span>
      ) : (
        children
      )}
    </Comp>
  )
}

export { Button, buttonVariants }
