'use client'

import IcoCart from '@/components/icons/Cart/IcoCart'
import { useAppSelector } from '@/lib/hooks/useAppSelector'
import { isPersonalizationFee } from '../helper'

const CartIcon = ({ onClick }: { onClick: () => void }) => {
  const cart = useAppSelector((state) => state.cart.cart)
  const totalQty =
    cart?.lines
      .filter((line) => !isPersonalizationFee(line))
      .reduce((sum, line) => sum + line.quantity, 0) ?? 0

  return (
    <button
      onClick={onClick}
      className="hover:[&_path]:stroke-primary relative rounded p-2"
      aria-label="open cart sidebar"
    >
      <IcoCart className="size-5 md:size-6" />
      {/* {cart?.cost.totalAmount.amount || 0} */}
      <span className="bg-primary absolute top-0 -right-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full text-xs text-white">
        {totalQty || 0}
      </span>
    </button>
  )
}

export default CartIcon
