'use client'

import Modal from '@/components/common/Modal'
import { PersonalizationPreview } from '@/components/products/ProductDetail/ProductPersonalizationEditor/PersonalizationPreview'
import { QuantityInput } from '@/components/ui/QuantityInput'
import { useAppDispatch } from '@/lib/hooks/useAppDispatch'
import { removeItem, updateItem } from '@/store/thunks/cartThunk'
import { CartLine } from '@/types/cart'
import cn from 'classnames'
import Image from 'next/image'
import React, { useMemo, useState } from 'react'
import PersonalizeInfo from './PersonalizeInfo'
import { IcoSpin } from '@/components/icons'

interface CartItemProps {
  item: CartLine
  variant?: 'sidecart' | 'checkout'
  displayPrice: number
  displayComparedAtPrice?: number
}

const CartItemComponent = ({
  item,
  variant = 'sidecart',
  displayPrice,
  displayComparedAtPrice,
}: CartItemProps) => {
  const dispatch = useAppDispatch()
  const [openModal, setOpenModal] = useState(false)
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
          'flex gap-2 md:gap-4',
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
          className="w-fit object-contain"
        />

        <div
          className={cn(
            'w-full',
            variant === 'checkout' &&
              'flex flex-col sm:flex-row sm:items-center sm:justify-center sm:gap-6'
          )}
        >
          <div className="line-clamp-2 text-base font-semibold">
            {item.merchandise.product.title}
          </div>

          <div className="mt-1 text-sm text-gray-500 uppercase">
            {item.merchandise.product.category.name}
            {personalization && <span> | Personalized </span>}
          </div>

          {personalization && (
            <PersonalizeInfo personalization={personalization} />
          )}

          <div className="mt-3 flex items-center gap-2">
            <p className="font-bold">
              ${(item.quantity * displayPrice).toFixed(2)}
            </p>
            {displayComparedAtPrice && (
              <p className="text-sm text-gray-500 line-through">
                ${(item.quantity * displayComparedAtPrice).toFixed(2)}
              </p>
            )}
          </div>

          <div className="mt-4 flex items-center justify-between">
            <QuantityInput
              value={item.quantity}
              min={1}
              max={item.merchandise.product.totalInventory ?? 99}
              onChange={handleChangeQuantity}
              loading={loading}
            />
            <div className="flex items-center">
              {personalization && (
                <>
                  <button
                    onClick={() => setOpenModal(true)}
                    aria-label="Remove from cart"
                    className="p-2 text-sm text-gray-700 uppercase hover:text-black md:text-base"
                  >
                    View
                  </button>
                  |
                </>
              )}
              <button
                onClick={handleRemove}
                aria-label="Remove from cart"
                className="p-2 text-sm underline hover:opacity-80 md:text-base"
              >
                remove
              </button>
            </div>
          </div>
        </div>
      </div>
      {personalization && (
        <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
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
        </Modal>
      )}
      {/* Loading overlay */}
      {loading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/60">
          <IcoSpin className="size-8 animate-spin" />
        </div>
      )}
    </div>
  )
}

export const CartItem = React.memo(CartItemComponent)
