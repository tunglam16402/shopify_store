import { Order } from '@/types/customer/order'
import Link from 'next/link'
import React from 'react'
import clsx from 'clsx'

interface IOrderList {
  orders: Order[]
}

const getStatusStyle = (status: string) => {
  switch (status?.toLowerCase()) {
    case 'fulfilled':
      return 'bg-emerald-50 text-emerald-600 border-emerald-200'
    case 'processing':
      return 'bg-amber-50 text-amber-600 border-amber-200'
    case 'cancelled':
      return 'bg-red-50 text-red-600 border-red-200'
    default:
      return 'bg-gray-50 text-gray-600 border-gray-200'
  }
}

const OrderList = ({ orders }: IOrderList) => {
  return (
    <div className="space-y-6">
      {orders.map((order) => (
        <article
          key={order.id}
          className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-white/80 p-6 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
          {/* Gradient accent */}
          <div className="from-primary/5 absolute inset-0 bg-gradient-to-r via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />

          <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            {/* LEFT SIDE */}
            <div className="space-y-2">
              <p className="text-lg font-semibold tracking-tight">
                Order{' '}
                <span className="font-medium text-gray-500">#{order.name}</span>
              </p>

              <p className="text-sm text-gray-500">
                Placed on {new Date(order.processedAt).toLocaleDateString()}
              </p>

              <div
                className={clsx(
                  'inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium',
                  getStatusStyle(order.fulfillmentStatus)
                )}
              >
                {order.fulfillmentStatus}
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <div className="text-right">
                <p className="text-sm text-gray-500">Total</p>
                <p className="text-xl font-semibold tracking-tight">
                  {order.totalPrice.amount}{' '}
                  <span className="text-sm text-gray-500">
                    {order.totalPrice.currencyCode}
                  </span>
                </p>
              </div>

              <Link
                href={`/order-detail/${order.name}`}
                className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
              >
                View Details
                <span className="transition group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}

export default OrderList
