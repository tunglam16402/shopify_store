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
}

const CartItemComponent = ({ item, variant = 'sidecart' }: CartItemProps) => {
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
          'flex gap-2 md:gap-4 border-b border-gray-400 py-2 ',
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
          className="object-contain w-fit"
        />

        <div
          className={cn(
            'w-full ',
            variant === 'checkout' &&
              'flex flex-col sm:flex-row sm:items-center sm:justify-center sm:gap-6'
          )}
        >
          <div className="text-base  line-clamp-2 font-semibold">
            {item.merchandise.product.title}
          </div>

          <div className="text-sm text-gray-500 uppercase mt-1">
            {item.merchandise.product.category.name}
            {personalization && <span> | Personalized </span>}
          </div>

          {personalization && (
            <PersonalizeInfo personalization={personalization} />
          )}

          <div className="flex items-center gap-2 mt-3">
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

          <div className="flex justify-between items-center mt-2 md:mt-4">
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
                    className="p-2 text-gray-700 text-sm md:text-base uppercase hover:text-black"
                  >
                    View
                  </button>
                  |
                </>
              )}
              <button
                onClick={handleRemove}
                aria-label="Remove from cart"
                className="p-2 hover:opacity-80 underline text-sm md:text-base"
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
        <div className="absolute inset-0 flex items-center justify-center bg-white/60 z-10">
         <IcoSpin className="size-8 animate-spin"/>
        </div>
      )}
    </div>
  )
}

export const CartItem = React.memo(CartItemComponent)
