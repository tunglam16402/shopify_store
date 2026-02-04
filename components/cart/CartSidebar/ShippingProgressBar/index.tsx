import { CartSubTotal } from '@/types/cart'
import React from 'react'

const FREE_SHIPPING_THRESHOLD = 69

interface IShippingProgressBar {
  subTotal?: CartSubTotal
}

const ShippingProgressBar = ({ subTotal }: IShippingProgressBar) => {
  const totalAmount = subTotal?.amount ?? 0
  const isFreeShipping = totalAmount >= FREE_SHIPPING_THRESHOLD

  const remaining = Math.max(FREE_SHIPPING_THRESHOLD - totalAmount, 0)

  const progress = Math.min((totalAmount / FREE_SHIPPING_THRESHOLD) * 100, 100)
  return (
    <div>
      {totalAmount > 0 && (
        <div className="space-y-2">
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
  )
}

export default ShippingProgressBar
