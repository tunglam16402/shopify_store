import { Order } from '@/types/customer/order'
import React, { FC } from 'react'

interface Props {
  order: Order
  isLoggedIn?: boolean
}

const DeliveryInfo: FC<Props> = ({ order, isLoggedIn }) => {
  const { shippingAddress } = order
  return shippingAddress && isLoggedIn ? (
    <>
      <p className="text-xl font-medium md:text-2xl">Delivery Info</p>

      <div className="mt-2 rounded-xl text-sm md:mt-4">
        <p className="font-bold">Delivery Address</p>

        <p className="mt-1">
          {order.shippingAddress?.firstName} {order.shippingAddress?.lastName}
        </p>

        <p>{order.shippingAddress?.address1}</p>

        <p>
          {order.shippingAddress?.province}, {order.shippingAddress?.zip}
        </p>

        {order.email && <p className="mt-3">Email: {order.email}</p>}

        {order.shippingAddress?.phone && (
          <p className="mt-1">Phone: {order.shippingAddress.phone}</p>
        )}
      </div>
    </>
  ) : null
}

export default DeliveryInfo
