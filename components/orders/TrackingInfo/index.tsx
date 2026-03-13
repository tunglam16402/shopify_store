import { Order } from '@/types/customer/order'
import Link from 'next/link'
import { FC } from 'react'
import dynamic from 'next/dynamic'

interface Props {
  order: Order
  isViewInvoice?: boolean
  shippingMethod: (string | null)[]
}

const InvoiceDownloadButton = dynamic(
  () =>
    import('../InvoiceDownload/InvoiceDownloadBtn').then(
      (m) => m.InvoiceDownloadButton
    ),
  { ssr: false }
)

const TrackingInfo: FC<Props> = ({ order, isViewInvoice, shippingMethod }) => {
  return (
    <>
      <h3 className="text-3xl font-medium md:text-4xl">Order Detail</h3>

      <div className="mt-2 flex flex-col gap-2 md:mt-4">
        <div>
          Tracking Order: <span className="font-semibold">{order.name}</span>
        </div>
        <Link href={''} className="line text-sm capitalize underline">
          Show Courier tracking
        </Link>

        <div>
          Shipping method:{' '}
          <span className="font-semibold">{shippingMethod}</span>
        </div>

        {isViewInvoice && <InvoiceDownloadButton order={order} />}
      </div>
    </>
  )
}

export default TrackingInfo
