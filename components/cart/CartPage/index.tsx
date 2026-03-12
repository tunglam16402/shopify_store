'use client'

import { getCartRecommendations } from '@/actions/cart'
import { CartItem } from '@/components/cart/CartItem'
import Loading from '@/components/common/Loading'
import { ProductRecommend } from '@/components/products'
import StyledHeading from '@/components/ui/StyledHeading'
import { useAppSelector } from '@/lib/hooks/useAppSelector'
import { getProductsByWidget } from '@/shopify/utils/get-product-by-widget'
import { ProductCardProps } from '@/types/product/productCard'
import { useEffect, useState, useTransition } from 'react'
import CartEmpty from '../CartEmpty'
import CartFooter from '../CartFooter'
import ShippingProgressBar from '../CartSidebar/ShippingProgressBar'
import { getCartDisplayItems } from '../helper'

const CartPage = () => {
  const { cart, hydrated } = useAppSelector((state) => state.cart)
  const displayItems = getCartDisplayItems(cart)
  const [recommendations, setRecommendations] = useState<ProductCardProps[]>([])
  const [, startTransition] = useTransition()
  const anchorProductId = cart?.lines?.[0]?.merchandise?.product.id

  useEffect(() => {
    startTransition(async () => {
      if (anchorProductId) {
        const res = await getCartRecommendations(anchorProductId)
        setRecommendations(res?.complementary ?? [])
        return
      }

      const fallback = await getProductsByWidget('latest')
      setRecommendations(fallback ?? [])
    })
  }, [anchorProductId])

  const subTotal = cart
    ? {
        amount: Number(cart.cost.subtotalAmount.amount),
        currencyCode: cart.cost.subtotalAmount.currencyCode,
      }
    : undefined

  const handleCheckout = () => {
    if (!cart?.checkoutUrl) return
    window.location.href = cart.checkoutUrl
  }

  if (!hydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loading />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {!cart || cart.lines.length === 0 ? (
        <div className="py-20 text-center">
          <CartEmpty headingClassName="mt-6 md:text-5xl text-4xl font-semibold" />
        </div>
      ) : (
        <div className="layout-width pt-2! md:pt-5!">
          <StyledHeading
            headingClass="text-4xl md:text-[54px]"
            subHeadingClass="font-sub-heading text-5xl md:text-[68px]"
            text="Shopping cart"
          />

          <div className="mt-4 flex flex-col gap-8 md:mt-6 lg:flex-row">
            <div className="w-full lg:w-3/5">
              {displayItems.map(
                ({ line, displayPrice, displayComparedAtPrice }) => (
                  <div
                    key={line.id}
                    className="border-b border-gray-300 py-3 md:py-4"
                  >
                    <CartItem
                      item={line}
                      variant="checkout"
                      displayPrice={displayPrice}
                      displayComparedAtPrice={displayComparedAtPrice}
                    />
                  </div>
                )
              )}
            </div>

            <div className="w-full space-y-4 lg:w-2/5">
              <div className="text-2xl font-semibold uppercase md:text-3xl">
                Order Summary
              </div>
              <div className="mt-4 md:mt-6">
                <ShippingProgressBar subTotal={subTotal} />
              </div>

              <CartFooter handleOnClick={handleCheckout} subTotal={subTotal}>
                CHECKOUT
              </CartFooter>
            </div>
          </div>
        </div>
      )}

      <div className="layout-width mt-8! md:mt-12!">
        <ProductRecommend title="You May Also Like" data={recommendations} />
      </div>
    </div>
  )
}

export default CartPage
