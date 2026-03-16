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
        {[
          {
            label: 'Subtotal',
            value: `$${Number(order?.subtotalPrice?.amount).toFixed(2)}`,
          },
          {
            label: 'Shipping',
            value: shippingPrice ? `$${shippingPrice.toFixed(2)}` : 'FREE',
            isFree: !shippingPrice,
          },
          {
            label: 'Sales Tax',
            value: `$${Number(order?.totalTax?.amount).toFixed(2)}`,
          },
          {
            label: 'Discount',
            value: '− $0.00',
            isDiscount: true,
          },
        ].map(({ label, value, isFree, isDiscount }) => (
          <div
            key={label}
            className="flex items-baseline justify-between border-b border-[#B8965A]/20 py-2.5 last:border-b-0"
          >
            <span className="text-[11px] font-normal tracking-[0.12em] text-[#9A9490] uppercase">
              {label}
            </span>
            <span
              className={[
                isFree
                  ? 'text-[11px] font-medium tracking-[0.15em] text-[#B8965A] uppercase'
                  : isDiscount
                    ? 'text-[14px] font-medium tracking-[0.04em] text-[#7B9E6B]'
                    : 'text-[14px] font-medium tracking-[0.04em] text-[#4A4540]',
              ].join('')}
            >
              {value}
            </span>
          </div>
        ))}

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
