import Breadcrumb from '@/components/common/Breadcrumb'
import { Order } from '@/types/customer/order'
import Image from 'next/image'
import React from 'react'

interface IOrderDetail {
  order: Order
}

const OrderDetail = ({ order }: IOrderDetail) => {
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
      <div className="mt-4">
        <div className="bg-secondary">
          <div className='layout-width'>
            <h3 className="text-3xl md:text-4xl pt-6 md:pt-8">Order Status</h3>

            {/* Shipping */}
            <div className="mt-6 rounded-xl p-4 text-sm text-gray-600">
              <p className="font-medium text-gray-800">Shipping Address</p>
              <p className="mt-1">
                {order.shippingAddress?.firstName}{' '}
                {order.shippingAddress?.lastName}
              </p>
              <p>{order.shippingAddress?.address1}</p>
              <p>
                {order.shippingAddress?.province}, {order.shippingAddress?.zip}
              </p>
              {order.shippingAddress?.phone && (
                <p className="mt-1">Phone: {order.shippingAddress.phone}</p>
              )}
            </div>
          </div>
        </div>
        <div className="mt-6 space-y-4">
          {order.lineItems.nodes.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 rounded-xl bg-gray-50 p-4"
            >
              <Image
                src={
                  item.variant?.product.images.nodes[0]?.url ||
                  '/placeholder.png'
                }
                alt={
                  item.variant?.product.images.nodes[0]?.altText ||
                  item.variant?.product.title ||
                  ''
                }
                width={80}
                height={80}
                className="h-20 w-20 rounded-lg object-cover"
              />

              <div className="flex-1">
                <p className="leading-snug font-medium">
                  {item.variant?.product.title}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Quantity: {item.quantity}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default OrderDetail
