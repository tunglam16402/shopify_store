'use client'

import SearchInput from '@/components/common/SearchInput'
import { useSearch } from '@/lib/hooks/useSearch'
import { Customer } from '@/types/customer'
import { OrderSortValue, sortOrders } from './helper'
import OrderList from './OrderList'
import OrderSort from './OrderSort'
import { useMemo, useState } from 'react'

interface IAccountDetail {
  customer: Customer
}

const OrderHistory = ({ customer }: IAccountDetail) => {
  const orders = customer?.orders?.nodes
  const [sort, setSort] = useState<OrderSortValue>('date-desc')
  const { query, setQuery, results } = useSearch({
    data: orders,
    keys: (item) => [item.name, item.fulfillmentStatus],
  })

  const sortedOrders = useMemo(() => {
    return sortOrders(results, sort)
  }, [results, sort])

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
      <div className="flex items-center justify-between">
        <h3 className="text-[26px] font-bold uppercase md:text-3xl">
          Order history
        </h3>
        <div className="w-full max-w-xl flex items-center justify-center gap-4">
          <SearchInput
            value={query}
            onSearch={setQuery}
            placeholder="Search order..."
            className='w-full'
          />
          <OrderSort value={sort} onChange={setSort} className='w-full'/>
        </div>
      </div>
      {sortedOrders.length ? (
        <OrderList orders={sortedOrders} />
      ) : (
        <div className="flex flex-col items-center justify-center">
          <h3 className="text-3xl md:text-[42px]">
            No matching{' '}
            <span className="font-sub-heading text-5xl">results</span>
          </h3>
          <p className="mt-6 md:mt-8">
            Your search did not return any results.
          </p>
          <p className="mt-2 md:mt-4">
            Check your spelling or try again with a less specific keyword
          </p>
        </div>
      )}
    </section>
  )
}

export default OrderHistory
