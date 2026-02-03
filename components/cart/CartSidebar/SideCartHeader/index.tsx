import { IcoClose } from '@/components/icons'
import StyledHeading from '@/components/ui/StyledHeading'
import { CartSubTotal } from '@/types/cart'
import React from 'react'

const FREE_SHIPPING_THRESHOLD = 69

interface SideCartHeader {
  subTotal?: CartSubTotal
  isClose: () => void
}

const SideCartHeader = ({ subTotal, isClose }: SideCartHeader) => {
  const totalAmount = subTotal?.amount ?? 0
  const isFreeShipping = totalAmount >= FREE_SHIPPING_THRESHOLD

  const remaining = Math.max(FREE_SHIPPING_THRESHOLD - totalAmount, 0)

  const progress = Math.min((totalAmount / FREE_SHIPPING_THRESHOLD) * 100, 100)

  return (
    <div className="sticky top-0 z-10 bg-white">
      <div className="relative px-4 py-2 md:px-6 md:py-4">
        {/* Close button */}
        <button
          type="button"
          onClick={isClose}
          aria-label="Close cart"
          className="absolute top-7 right-4 md:top-9 md:right-6"
        >
          <IcoClose className="size-4 transition-transform duration-300 hover:rotate-90 md:size-5" />
        </button>

        <StyledHeading
          headingClass="text-4xl md:text-[54px]"
          subHeadingClass="font-sub-heading text-5xl md:text-[68px]"
          text="Shopping cart"
        />

        {totalAmount > 0 && (
          <div className="mt-8 space-y-2 md:mt-10">
            <p className="text-sm md:text-xs">
              {isFreeShipping ? (
                <span>🎉 Congrats! You get free standard shipping.</span>
              ) : (
                <>
                  Left for free shipping{' '}
                  <span className="font-medium">
                    {subTotal?.currencyCode} {remaining.toFixed(2)}
                  </span>
                </>
              )}
            </p>

            <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
              <div
                className="bg-primary h-full rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SideCartHeader
