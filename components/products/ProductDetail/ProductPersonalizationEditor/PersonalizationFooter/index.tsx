'use client'

import AddToCart from '@/components/products/AddToCart'
import { CartLinePersonalizationPayload } from '@/shopify/cart/use-cart'
import { ProductDetailProps } from '../..'
import { useRef, useState } from 'react'
import PersonalizationConfirmModal from '../PersonalizationConfirmModal'
import { buildEmptyPersonalizationMessage } from '@/components/products/helper'

interface IPersonalizationFooter {
  product: ProductDetailProps['product']
  totalPrice: number
  personalization: CartLinePersonalizationPayload
  onClose: () => void
}

const PersonalizationFooter = ({
  product,
  totalPrice,
  personalization,
  onClose,
}: IPersonalizationFooter) => {
  const [showAddToCartModal, setShowAddToCartModal] = useState(false)
  const [checked, setChecked] = useState(false)
  const [showCheckboxError, setShowCheckboxError] = useState(false)

  const emptyFieldsMessage = buildEmptyPersonalizationMessage(
    personalization.values,
    personalization.textBlock?.lines ?? []
  )

  const confirmRef = useRef<() => void>(() => {})
  const cancelRef = useRef<() => void>(() => {})

  const handleBeforeAdd = () => {
    if (!checked) {
      setShowCheckboxError(true)
      return false
    }

    setShowCheckboxError(false)

    if (!emptyFieldsMessage) return true

    return new Promise<boolean>((resolve) => {
      setShowAddToCartModal(true)

      confirmRef.current = () => {
        setShowAddToCartModal(false)
        resolve(true)
      }

      cancelRef.current = () => {
        setShowAddToCartModal(false)
        resolve(false)
      }
    })
  }

  return (
    <div className="fixed right-0 bottom-0 left-0 z-20 flex flex-col items-center gap-2 border-t bg-white p-4 md:flex-row md:justify-between md:px-8">
      <div className="text-base font-semibold md:text-lg">
        Personalization of {product.title} | Personalized
      </div>

      <div className="flex w-full flex-col items-center gap-2 md:w-fit md:flex-row md:gap-4">
        <div>
          <label className="flex cursor-pointer items-start gap-2 text-sm">
            <input
              type="checkbox"
              checked={checked}
              onChange={(e) => {
                setChecked(e.target.checked)
                if (e.target.checked) setShowCheckboxError(false)
              }}
              className="peer accent-primary mt-0.5 h-4 w-4 cursor-pointer"
            />

            <span className="text-gray-500 transition peer-checked:text-black">
              I understand that personalized products are non-refundable.
            </span>
          </label>

          {showCheckboxError && (
            <p className="mt-1 text-xs text-red-500">
              Please confirm before adding this product to cart.
            </p>
          )}
        </div>

        <AddToCart
          variantId={product.variant?.id || ''}
          className="bg-primary mt-2 w-full text-white hover:bg-white! hover:text-black! md:mt-0 md:w-fit md:px-24 md:py-5 md:text-lg"
          product={product}
          cartBtnPrice={totalPrice}
          personalization={personalization}
          beforeAdd={handleBeforeAdd}
          onAdded={onClose}
        />
      </div>

      {showAddToCartModal && emptyFieldsMessage && (
        <PersonalizationConfirmModal
          title="Are you sure?"
          description={emptyFieldsMessage}
          cancelText="EDIT"
          confirmText="ADD TO CART"
          onConfirm={() => confirmRef.current()}
          onCancel={() => cancelRef.current()}
        />
      )}
    </div>
  )
}

export default PersonalizationFooter
