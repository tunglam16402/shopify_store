import { Order } from '@/types/customer/order'
import React from 'react'

interface IOrderSummary {
  order: Order
}

const OrderSummary: React.FC<IOrderSummary> = ({ order }) => {
  const shippingPrice = Number(order?.totalShippingPrice.amount || 0)

  return (
    <div>
      <hr className="my-[18px] border-t-[0.5px] border-t-[#9A9A9A] md:hidden" />
      <h4 className="text-xl font-bold md:text-[26px]">Order Summary</h4>
      <div className="mt-4 flex flex-col gap-2 tracking-wider md:mt-6">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${order?.subtotalPrice?.amount}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>
            {shippingPrice ? `$${Number(shippingPrice).toFixed(2)}` : 'FREE'}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Sales Tax</span>
          <span>${Number(order?.totalTax?.amount)?.toFixed(2)}</span>
        </div>
        <div className="text-primary flex justify-between">
          <span>Discount</span>
          <span>
            -$0.00
            {/* {Number(
              order?.totalDiscountsSet?.presentmentMoney?.amount
            )?.toFixed(2) || '0.00'} */}
          </span>
        </div>
        <hr className="my-2 border-t-[0.5px] border-t-[#9A9A9A] md:hidden" />
        <div className="flex justify-between text-xl font-bold md:mt-[30px]">
          <span>Total</span>
          <span>${Number(order?.totalPrice?.amount)?.toFixed(2)}</span>
        </div>
      </div>
    </div>
  )
}

export default OrderSummary
