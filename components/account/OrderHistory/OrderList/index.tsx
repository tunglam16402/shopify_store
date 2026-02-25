import { Order } from '@/types/customer/order'
import Link from 'next/link'
import React from 'react'

interface IOrderList {
  orders: Order[]
}

const OrderList = ({ orders }: IOrderList) => {
  return (
    <div>
      {orders.map((order) => (
        <article
          key={order.id}
          className="rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-md"
        >
          {/* Order Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-4">
            <div>
              <p className="text-lg font-semibold">
                Order <span className="text-gray-500">{order.name}</span>
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Placed on {new Date(order.processedAt).toLocaleDateString()}
              </p>
            </div>

            <div className="rounded-full bg-black px-4 py-2 text-sm font-medium text-white">
              {order.totalPrice.amount} {order.totalPrice.currencyCode}
            </div>

            <div>
              <Link
                href={`/order-detail/${order.name}`}
                className="text-primary hidden cursor-pointer text-right md:block"
              >
                View order
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}

export default OrderList
