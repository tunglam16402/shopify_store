'use client'

import { PDFDownloadLink } from '@react-pdf/renderer'
import { Order } from '@/types/customer/order'
import { InvoiceDownload } from '..'
import { IcoPrint } from '@/components/icons'

export const InvoiceDownloadButton = ({ order }: { order: Order }) => {
  return (
    <PDFDownloadLink
      document={<InvoiceDownload order={order} />}
      fileName={`invoice-${order.name}.pdf`}
      className='flex items-center gap-2 hover:text-gray-700'
    >
      <IcoPrint /> Download Invoice
    </PDFDownloadLink>
  )
}
