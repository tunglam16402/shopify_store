'use client'

import { RootState } from '@/store/store'
import Image from 'next/image'
import React from 'react'
import { useSelector } from 'react-redux'

const OrderHistory = () => {
  const { customer } = useSelector((state: RootState) => state.user)

  const orders = customer?.orders?.nodes

  console.log('orders :>> ', orders)

  if (orders?.length === 0) {
    return <p className="text-gray-500">You have no orders yet.</p>
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Order History</h2>
      {orders?.map((order) => (
        <div
          key={order.id}
          className="border rounded-lg p-4 shadow-sm bg-white space-y-4"
        >
          {/* Order header */}
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">Order {order.name}</p>
              <p className="text-sm text-gray-500">
                Placed on {new Date(order.processedAt).toLocaleDateString()}
              </p>
            </div>
            <p className="font-semibold">
              {order.totalPrice.amount} {order.totalPrice.currencyCode}
            </p>
          </div>

          {/* Line items */}
          <div className="divide-y">
            {order.lineItems.nodes.map((item, index) => (
              <div key={index} className="flex items-center gap-4 py-2">
                <Image
                  src={item.variant?.product.images.nodes[0]?.url || ''}
                  alt={
                    item.variant?.product.images.nodes[0]?.altText ||
                    item.variant?.product.title ||
                    ''
                  }
                  width={200}
                  height={100}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <p className="font-medium">{item.variant?.product.title}</p>
                  <p className="text-sm text-gray-500">
                    Quantity: {item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Shipping Address */}
          <div className="text-sm text-gray-600">
            <p>
              Ship to: {order.shippingAddress?.firstName}{' '}
              {order.shippingAddress?.lastName}
            </p>
            <p>{order.shippingAddress?.address1}</p>
            <p>
              {order.shippingAddress?.province}, {order.shippingAddress?.zip}
            </p>
            {order.shippingAddress?.phone && (
              <p>Phone: {order.shippingAddress.phone}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default OrderHistory
