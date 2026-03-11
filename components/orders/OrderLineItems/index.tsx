import { LineItem } from '@/types/customer/order'
import React from 'react'
import OrderItem from '../OrderItem'

interface Props {
  lineItems: LineItem[]
}

const OrderLineItems: React.FC<Props> = ({ lineItems }) => {
  return (
    <div>
      <div className="text-[20px] font-bold md:text-[25px]">Your Order</div>
      <div className="mt-4 flex flex-col gap-[18px]">
        {lineItems.map((item) => (
          <OrderItem key={item.variant?.id} item={item} />
        ))}
      </div>
    </div>
  )
}

export default OrderLineItems
