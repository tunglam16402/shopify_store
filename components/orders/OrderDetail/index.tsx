'use client'

import Breadcrumb from '@/components/common/Breadcrumb'
import { Order } from '@/types/customer/order'
import DeliveryInfo from '../DeliveryInfo'
import { getListSteps } from '../helper'
import OrderLineItems from '../OrderLineItems'
import OrderProgress from '../OrderProgress'
import TrackingInfo from '../TrackingInfo'
import OrderSummary from '../OrderSummary'
import { useEffect, useState, useTransition } from 'react'
import { getCartRecommendations } from '@/actions/cart'
import { ProductCardProps } from '@/types/product/productCard'
import { ProductRecommend } from '@/components/products'

interface IOrderDetail {
  order: Order
  isLoggedIn?: boolean
  isViewInvoice?: boolean
  shippingMethod: (string | null)[]
}

const OrderDetail = ({
  order,
  isLoggedIn,
  isViewInvoice,
  shippingMethod,
}: IOrderDetail) => {
  const steps = getListSteps(order.fulfillmentStatus)
  const [, startTransition] = useTransition()
  const [recommendations, setRecommendations] = useState<ProductCardProps[]>([])

  const anchorProductId = order?.lineItems.nodes[0].variant?.product.id

  useEffect(() => {
    if (!anchorProductId) return

    startTransition(async () => {
      const res = await getCartRecommendations(anchorProductId)
      setRecommendations(res?.complementary ?? [])
    })
  }, [anchorProductId])

  return (
    <div className="mobile-mt">
      <div className="page-width">
        <Breadcrumb
          items={[
            { label: 'Order History', href: '/account?tab=order' },
            { label: 'Order Status', href: '/order-status' },
          ]}
        />
      </div>
      <div className="relative mt-4 tracking-wide">
        <div className="bg-secondary absolute z-[-2] h-[400px] w-full md:h-[580px]"></div>
        <div className="pt-6 md:pt-10">
          <div className="mx-auto flex max-w-5xl flex-col px-[15px] md:flex-row md:flex-wrap">
            <div className="order-1 md:w-1/2">
              <TrackingInfo
                order={order}
                isViewInvoice={isViewInvoice}
                shippingMethod={shippingMethod}
              />
            </div>

            {!!steps.length && (
              <div className="order-2 mt-6 md:order-3 md:mt-10 md:w-full">
                <OrderProgress steps={steps} />
              </div>
            )}

            <div className="order-3 mt-6 md:order-2 md:mt-1 md:w-1/2">
              <DeliveryInfo order={order} isLoggedIn={isLoggedIn} />
            </div>
          </div>
        </div>
        <div className="mx-auto mt-8 flex max-w-5xl flex-col space-y-4 px-[15px] md:mt-12 md:flex-row md:gap-6">
          <div className="md:w-[60%]">
            <OrderLineItems lineItems={order?.lineItems?.nodes || []} />
          </div>
          <div className="flex-1 md:border-l md:border-l-[#9A9A9A] md:pl-6">
            <OrderSummary order={order} />
          </div>
        </div>
        <div className="mx-auto mt-16 max-w-5xl md:mt-20">
          <ProductRecommend title="Just for you" data={recommendations} />
        </div>
      </div>
    </div>
  )
}

export default OrderDetail
