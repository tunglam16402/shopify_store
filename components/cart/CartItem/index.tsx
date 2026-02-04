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
import Link from 'next/link'
import { useAppSelector } from '@/lib/hooks/useAppSelector'

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
  const loading = useAppSelector((state) =>
    state.cart.loadingLineIds.includes(item.id)
  )

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
    try {
      await dispatch(
        updateItem({ lineId: item.id, quantity: newQuantity })
      ).unwrap()
    } catch (err) {
      console.error(err)
    }
  }

  const handleRemove = async () => {
    try {
      await dispatch(removeItem(item.id)).unwrap()
    } catch (err) {
      console.error(err)
    }
  }

  const discountPercent =
    displayComparedAtPrice && displayComparedAtPrice > displayPrice
      ? Math.round(
          ((displayComparedAtPrice - displayPrice) / displayComparedAtPrice) *
            100
        )
      : null

  return (
    <div className="relative">
      <div className="flex items-center gap-2 md:gap-4">
        <Link href={item.merchandise.product.handle}>
          <div className="relative h-36 w-28 md:h-40 md:w-32">
            <Image
              src={item.merchandise.image?.url || ''}
              alt="cart item thumbnail"
              fill
              className="absolute object-contain"
              sizes="(max-width: 768px) 112px, 128px"
            />
          </div>
        </Link>

        <div className="w-full">
          <div
            className={cn(
              variant === 'checkout' && 'md:flex md:justify-between'
            )}
          >
            <div>
              <div className="line-clamp-2 text-base font-semibold">
                <Link href={item.merchandise.product.handle}>
                  {item.merchandise.product.title}
                </Link>
              </div>

              <div className="mt-1 text-sm text-gray-500 uppercase">
                {item.merchandise.product.category.name}
                {personalization && <span> | Personalized </span>}
              </div>

              {personalization && (
                <div className="max-w-[360px]">
                  <PersonalizeInfo personalization={personalization} />
                </div>
              )}
            </div>

            <div
              className={cn(
                variant === 'checkout'
                  ? 'mt-4 flex items-center gap-3 md:mt-0 md:flex-col md:items-end md:gap-0 md:text-end'
                  : 'mt-3 flex items-center gap-2'
              )}
            >
              {variant === 'checkout' && displayComparedAtPrice && (
                <p className="text-primary order-1 text-xs md:order-0 md:mb-1">
                  <span className="bg-primary px-1.5 py-1 text-white md:mr-2">
                    {discountPercent}% off
                  </span>
                  <span className="hidden md:inline-block">
                    Limited time deal
                  </span>
                </p>
              )}
              <p className="font-bold">
                {item.merchandise.price.currencyCode}
                {(item.quantity * displayPrice).toFixed(2)}
              </p>
              {displayComparedAtPrice && (
                <p className="text-primary order-2 text-sm line-through md:order-0">
                  {item.merchandise.price.currencyCode}
                  {(item.quantity * displayComparedAtPrice).toFixed(2)}
                </p>
              )}
            </div>
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
