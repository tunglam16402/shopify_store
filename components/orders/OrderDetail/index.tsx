'use client'

import Breadcrumb from '@/components/common/Breadcrumb'
import { IcoPrint } from '@/components/icons'
import { Order } from '@/types/customer/order'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { downloadInvoice, getListSteps } from '../helper'
import OrderProgress from '../OrderProgress'
import DeliveryInfo from '../DeliveryInfo'
import TrackingInfo from '../TrackingInfo'
import OrderLineItems from '../OrderLineItems'

interface IOrderDetail {
  order: Order
  isLoggedIn?: boolean
  isViewInvoice?: boolean
}

const OrderDetail = ({ order, isLoggedIn, isViewInvoice }: IOrderDetail) => {
  console.log('order :>> ', order)
  const steps = getListSteps(order.fulfillmentStatus)
  return (
    <div className="mobile-mt">
      <div className="page-width">
        <Breadcrumb
          items={[
            { label: 'Order History', href: '/account/order-history' },
            { label: 'Order Status', href: '/order-status' },
          ]}
        />
      </div>
      <div className="relative mt-4 tracking-wide">
        <div className="bg-secondary absolute z-[-2] h-[350px] w-full md:h-[480px]"></div>
        <div className="py-10">
          <div className="mx-auto flex max-w-5xl flex-col px-[15px] md:flex-row md:flex-wrap">
            <div className="order-1 md:w-1/2">
              <TrackingInfo order={order} isViewInvoice={isViewInvoice} />
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
        <div className="mx-auto mt-6 max-w-5xl space-y-4 px-[15px]">
          <OrderLineItems lineItems={order?.lineItems?.nodes || []} />
        </div>
      </div>
    </div>
  )
}

export default OrderDetail
