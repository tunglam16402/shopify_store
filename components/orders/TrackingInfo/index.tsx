import { IcoPrint } from '@/components/icons'
import { Order } from '@/types/customer/order'
import Link from 'next/link'
import { FC } from 'react'
import { downloadInvoice } from '../helper'

interface Props {
  order: Order
  isViewInvoice?: boolean
}

const TrackingInfo: FC<Props> = ({ order, isViewInvoice }) => {
  return (
    <>
      <h3 className="text-3xl font-medium md:text-4xl">Order Status</h3>

      <div className="mt-2 flex flex-col gap-2 md:mt-4">
        <div>
          Tracking Order: <span className="font-semibold">{order.name}</span>
        </div>
        <Link href={''} className="line text-sm capitalize underline">
          Show Courier tracking
        </Link>

        <div>
          Shipping method:{' '}
          <span className="font-semibold">{order.fulfillmentStatus}</span>
        </div>

        {isViewInvoice && (
          <span
            onClick={() => downloadInvoice(order?.name)}
            className="flex cursor-pointer items-center gap-2 text-sm md:gap-4 md:text-base"
          >
            <IcoPrint />
            <span>View Invoice</span>
          </span>
        )}
      </div>
    </>
  )
}

export default TrackingInfo
