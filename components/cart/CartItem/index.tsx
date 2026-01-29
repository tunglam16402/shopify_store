'use client'

import Image from 'next/image'
import { QuantityInput } from '@/components/ui/QuantityInput'
import { CartLine } from '@/types/cart'
import cn from 'classnames'
import React, { useMemo } from 'react'
import { useAppDispatch } from '@/lib/hooks/useAppDispatch'
import { removeItem, updateItem } from '@/store/thunks/cartThunk'
import { PersonalizationPreview } from '@/components/products/ProductDetail/ProductPersonalizationEditor/PersonalizationPreview'
import PersonalizeInfo from './PersonalizeInfo'

interface CartItemProps {
  item: CartLine
  variant?: 'sidecart' | 'checkout'
}

const CartItemComponent = ({ item, variant = 'sidecart' }: CartItemProps) => {
  const dispatch = useAppDispatch()
  const [loading, setLoading] = React.useState(false)

  const personalization = useMemo(() => {
    const attr = item.attributes?.find(
      (a) => a.key === 'personalization_config'
    )
    if (!attr?.value) return null

    try {
      return JSON.parse(attr.value)
    } catch {
      return null
    }
  }, [item.attributes])

  const handleChangeQuantity = async (newQuantity: number) => {
    setLoading(true)
    try {
      await dispatch(
        updateItem({ lineId: item.id, quantity: newQuantity })
      ).unwrap()
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleRemove = async () => {
    setLoading(true)
    try {
      await dispatch(removeItem(item.id)).unwrap()
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative">
      <div
        className={cn(
          'flex justify-between border-b border-gray-400 py-2 ',
          variant === 'checkout'
            ? 'items-start gap-6 sm:flex-row sm:items-center sm:gap-2'
            : 'items-center'
        )}
      >
        <Image
          src={item.merchandise.image?.url || ''}
          alt="cart item thumbnail"
          width={100}
          height={100}
          className="object-contain w-full max-w-[140px] h-40 mr-0 sm:mr-4"
        />

        <div
          className={cn(
            'space-y-2',
            variant === 'checkout' &&
              'flex flex-col sm:flex-row sm:items-center sm:justify-center sm:gap-6'
          )}
        >
          <span className="text-sm line-clamp-3">
            {item.merchandise.product.title}
          </span>
          {personalization && (
            <PersonalizationPreview
              productImage={personalization.productImage}
              textBlock={personalization.textBlock}
              values={personalization.values}
              position={personalization.position}
              font={personalization.font}
              fontSize={personalization.fontSize}
              fontWeight={personalization.fontWeight}
              color={personalization.color}
            />
          )}
          {personalization && (
            <PersonalizeInfo personalization={personalization} />
          )}

          <span className="text-sm text-gray-500 ">
            {item.merchandise.product.category.name}
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
          onClick={handleRemove}
          aria-label="Remove from cart"
          className="mt-2 md:mt-0 md:ml-4 p-1 underline hover:opacity-80 rounded self-start md:self-auto"
        >
          remove
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
