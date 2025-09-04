'use client'
import { Trash2 } from 'lucide-react'
import Image from 'next/image'
import { QuantityInput } from '@/components/ui/QuantityInput'
import { CartLine } from '@/context/cart/Provider'
import { useCart } from '@/lib/hooks/useCart'
import clsx from 'clsx'
import React from 'react'

interface CartItemProps {
  item: CartLine
  variant?: 'sidecart' | 'checkout'
}

const CartItemComponent = ({ item, variant = 'sidecart' }: CartItemProps) => {
  const { updateItem, removeItem } = useCart()
  const [loading, setLoading] = React.useState(false)

  const handleChangeQuantity = async (newQuantity: number) => {
    setLoading(true)
    try {
      await updateItem(item.id, newQuantity)
    } finally {
      setLoading(false)
    }
  }

  console.log('item :>> ', item)

  return (
    <div className="relative">
      <div
        className={clsx(
          'flex justify-between border-b border-gray-400 py-2 ',
          variant === 'checkout'
            ? 'items-start gap-6 sm:flex-row  sm:items-center sm:gap-2'
            : 'items-center'
        )}
      >
        <Image
          src={item.merchandise.image?.url || ''}
          alt="cart item thumbnail"
          width={100}
          height={100}
          className="object-contain w-full max-w-[140px] h-[160px] mr-0 sm:mr-4"
        />

        <div
          className={clsx(
            'space-y-2',
            variant === 'checkout' &&
              'flex flex-col sm:flex-row sm:items-center sm:justify-center sm:gap-6'
          )}
        >
          <span className="text-sm line-clamp-3">
            {item.merchandise.product.title}
          </span>
          <span className="text-sm text-gray-500 ">
            {item.merchandise.title}
          </span>
          <div className="flex items-center gap-2">
            <p className="font-bold">
              ${(item.quantity * item.merchandise.price.amount).toFixed(2)}
            </p>
            <p className="text-sm text-gray-500 line-through text-main-color">
              $
              {item.merchandise.compareAtPrice
                ? (
                    item.quantity * item.merchandise.compareAtPrice.amount
                  ).toFixed(2)
                : null}
            </p>
          </div>
          <QuantityInput
            value={item.quantity}
            min={1}
            max={item.merchandise.product.totalInventory ?? 99}
            onChange={handleChangeQuantity}
            loading={loading}
          />
        </div>

        <button
          onClick={() => removeItem(item.id)}
          aria-label="Remove from cart"
          className="mt-2 sm:mt-0 sm:ml-4 p-1 hover:bg-gray-100 rounded cursor-pointer self-start sm:self-auto"
        >
          <Trash2 className="w-5 h-5 text-red-500" />
        </button>
      </div>
      {/* Loading overlay */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/60 z-10">
          <svg
            className="animate-spin h-8 w-8 text-gray-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4l-3 3 3 3h-4z"
            ></path>
          </svg>
        </div>
      )}
    </div>
  )
}

export const CartItem = React.memo(CartItemComponent)
