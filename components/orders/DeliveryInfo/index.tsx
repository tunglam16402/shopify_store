import { Order } from '@/types/customer/order'
import React, { FC } from 'react'

interface Props {
  order: Order
  isLoggedIn?: boolean
}

const DeliveryInfo: FC<Props> = ({ order, isLoggedIn }) => {
  const { shippingAddress } = order

  if (!shippingAddress || !isLoggedIn) return null

  const fullName =
    [shippingAddress.firstName, shippingAddress.lastName]
      .filter(Boolean)
      .join(' ') || 'N/A'

  const addressLine =
    [shippingAddress.address2, shippingAddress.address1]
      .filter(Boolean)
      .join(', ') || 'N/A'

  const locationLine =
    [shippingAddress.province, shippingAddress.city, shippingAddress.country]
      .filter(Boolean)
      .join(', ') || 'N/A'

  return (
    <section className="space-y-4">
      <div>
        <h4 className="text-xl font-semibold text-gray-900 md:text-2xl">
          Delivery Info
        </h4>
      </div>

      <div>
        <p className="text-sm font-semibold text-gray-900 md:text-base">
          Delivery Address
        </p>

        <div className="mt-1 space-y-3 text-sm text-gray-700 md:text-base">
          <p>
            <span className="text-gray-500">Recipient: </span>
            <span className="text-gray-900">{fullName}</span>
          </p>

          <p>
            <span className="text-gray-500">Address: </span>
            <span className="text-gray-900">{addressLine}</span>
          </p>

          <p>
            <span className="text-gray-500">Region: </span>
            <span className="text-gray-900">{locationLine}</span>
          </p>

          {shippingAddress.zip && (
            <p>
              <span className="text-gray-500">Postal Code: </span>
              <span className="text-gray-900">{shippingAddress.zip}</span>
            </p>
          )}

          {order.email && (
            <p>
              <span className="text-gray-500">Email: </span>
              <span className="break-all text-gray-900">{order.email}</span>
            </p>
          )}

          {shippingAddress.phone && (
            <p>
              <span className="text-gray-500">Phone: </span>
              <span className="text-gray-900">{shippingAddress.phone}</span>
            </p>
          )}
        </div>
      </div>
    </section>
  )
}

export default DeliveryInfo
