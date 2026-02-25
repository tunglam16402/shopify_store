'use client'

import SearchInput from '@/components/common/SearchInput'
import { Customer } from '@/types/customer'
import Image from 'next/image'
import OrderSort from './OrderSort'
import OrderList from './OrderList'

interface IAccountDetail {
  customer: Customer
}

const OrderHistory = ({ customer }: IAccountDetail) => {
  const orders = customer?.orders?.nodes
  console.log('orders :>> ', orders)

  if (!orders || orders.length === 0) {
    return (
      <div className="rounded-xl border border-dashed p-10 text-center">
        <p className="text-lg font-medium">No orders yet</p>
        <p className="mt-2 text-sm text-gray-500">
          When you place an order, it will appear here.
        </p>
      </div>
    )
  }

  return (
    <section className="space-y-10">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Order History</h2>
        <div>
          {/* <SearchInput
            value={search}
            onSearch={setSearch}
            placeholder="Search order ID..."
            debounceMs={300}
            className="w-full md:max-w-sm"
          />
          <OrderSort
            value={sort}
            onChange={(value: string) => {
              setSort(value)
              setPage(1)
            }}
          /> */}
        </div>
        <OrderList orders={orders} />
      </div>
    </section>
  )
}

export default OrderHistory
