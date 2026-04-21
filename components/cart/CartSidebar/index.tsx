'use client'

import { getCartRecommendations } from '@/actions/cart'
import { ProductRecommend } from '@/components/products'
import { useAppSelector } from '@/lib/hooks/useAppSelector'
import { useRouter } from 'next/navigation'
import useSWR from 'swr'
import CartEmpty from '../CartEmpty'
import CartFooter from '../CartFooter'
import { CartItem } from '../CartItem'
import { getCartDisplayItems, isPersonalizationFee } from '../helper'
import SideCartHeader from './SideCartHeader'

interface ICartSideBar {
  isClose: () => void
}

export const SIDEBAR_SWIPER_BREAKPOINT = {
  0: {
    slidesPerView: 2,
    slidesPerGroup: 2,
    spaceBetween: 8,
  },
  640: {
    slidesPerView: 2,
    slidesPerGroup: 2,
    spaceBetween: 8,
  },
  1024: {
    slidesPerView: 2,
    slidesPerGroup: 2,
    spaceBetween: 8,
  },
}

const CartSideBar = ({ isClose }: ICartSideBar) => {
  const router = useRouter()
  const cart = useAppSelector((state) => state.cart.cart)
  const displayItems = getCartDisplayItems(cart)

  const anchorProductId = cart?.lines?.[0]?.merchandise?.product.id
  const subTotal = cart?.cost.subtotalAmount

  const { data } = useSWR(
    anchorProductId ? ['cart-recommendations', anchorProductId] : null,
    () => getCartRecommendations(anchorProductId!)
  )

  const recommendations = data?.complementary ?? []

  const lines = cart?.lines ?? []

  const productLines = lines.filter((line) => !isPersonalizationFee(line))

  const handleCheckout = () => {
    isClose()
    router.push('/cart')
  }

  return (
    <div className="flex h-full flex-col">
      <SideCartHeader subTotal={subTotal} />
      <div className="flex-1 overflow-y-auto">
        {productLines.length === 0 ? (
          <CartEmpty />
        ) : (
          displayItems.map(({ line, displayPrice, displayComparedAtPrice }) => (
            <div
              key={line.id}
              className="border-b border-gray-300 px-4 py-3 md:px-6"
            >
              <CartItem
                item={line}
                variant="sidecart"
                displayPrice={displayPrice}
                displayComparedAtPrice={displayComparedAtPrice}
              />
            </div>
          ))
        )}
        {lines.length > 0 && recommendations.length > 0 && (
          <div className="mt-4 md:mt-6">
            <ProductRecommend
              title="You may also like"
              data={recommendations}
              headingClassName="text-2xl md:text-3xl"
              subHeadingClassName="text-3xl md:text-4xl font-sub-heading"
              swiperBreakpoints={SIDEBAR_SWIPER_BREAKPOINT}
              styleHeadingClassName="px-4 md:px-6"
            />
          </div>
        )}
      </div>

      <CartFooter handleOnClick={handleCheckout} subTotal={subTotal} />
    </div>
  )
}

export default CartSideBar
