import { Order } from '@/types/customer/order'
import Link from 'next/link'
import { FC } from 'react'
import dynamic from 'next/dynamic'

interface Props {
  order: Order
  isViewInvoice?: boolean
  shippingMethod: (string | null)[]
  trackingUrl?: string
}

const InvoiceDownloadButton = dynamic(
  () =>
    import('../InvoiceDownload/InvoiceDownloadBtn').then(
      (m) => m.InvoiceDownloadButton
    ),
  { ssr: false }
)

const TrackingInfo: FC<Props> = ({
  order,
  isViewInvoice,
  shippingMethod,
  trackingUrl,
}) => {
  const shippingMethodText = shippingMethod.filter(Boolean).join(', ') || 'N/A'

  return (
    <section>
      <div className="space-y-4">
        <div>
          <h3 className="text-3xl font-semibold md:text-4xl">Order Detail</h3>
          <p className="mt-2 text-sm text-gray-700 md:text-base">
            Review your order tracking and shipping details.
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex flex-row gap-1">
            <span className="text-sm md:text-base">Tracking Order:</span>
            <span className="text-sm font-semibold uppercase md:text-base">
              {order.name}
            </span>
          </div>

          <div className="flex flex-row gap-1">
            <span className="text-sm md:text-base">Shipping Method:</span>
            <span className="text-sm font-semibold uppercase md:text-base">
              {shippingMethodText}
            </span>
          </div>

          <div className="pt-1">
            {trackingUrl ? (
              <Link
                href={trackingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex font-medium text-black underline underline-offset-4 transition-opacity hover:opacity-70"
              >
                Show courier tracking
              </Link>
            ) : (
              <span className="text-gray-400">
                Courier tracking is not available yet
              </span>
            )}
          </div>

          {isViewInvoice && (
            <div className="pt-2">
              <InvoiceDownloadButton order={order} />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default TrackingInfo
