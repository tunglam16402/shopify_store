import { LineItem } from '@/types/customer/order'
import React from 'react'
import OrderItem from '../OrderItem'

interface Props {
  lineItems: LineItem[]
}

const OrderLineItems: React.FC<Props> = ({ lineItems }) => {
  return (
    <div>
      <h4 className="text-xl font-bold md:text-[26px]">Your Order</h4>
      <div className="mt-4 flex flex-col gap-[18px] md:mt-6">
        {lineItems.map((item) => (
          <OrderItem key={item.variant?.id} item={item} />
        ))}
      </div>
    </div>
  )
}

export default OrderLineItems
