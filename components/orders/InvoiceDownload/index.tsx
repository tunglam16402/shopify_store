import { Order } from '@/types/customer/order'
import styles from './InvoiceDownload.module.css'
import { Logo } from '@/components/icons'

interface InvoiceDownloadProp {
  order?: Order
}

export const InvoiceDownload: React.FC<InvoiceDownloadProp> = ({ order }) => {
  console.log('order :>> ', order)
  return (
    <div className={styles.container} id="invoice-dowload">
      <div className="flex justify-between">
        <div className={styles.heading}>
          <div>Oz Hair and Beauty</div>
          <div>5 - 7 Resolution Drive</div>
          <div>Caringbah, NSW 2229</div>
          <div>Australia</div>
          <div>Ph: 1300 40 30 35</div>
          <div>enquiries@ozhairandbeauty.com</div>
          <div>www.ozhairandbeauty.com/</div>
        </div>
        <div className="mt-5">
          <Logo />
        </div>
      </div>
      <div className={styles.taxInvoice}>
        <p className={styles.header}>Tax Invoice</p>
        <p>Invoice No: {order?.name}</p>
        {/* {!!order?.poNumber && <p>PO No: {order?.poNumber}</p>} */}
      </div>
      <div className={styles.blockBillShip}>
        {/* <div className={styles.billBlock}>
          <p className={styles.header}>Bill To</p>
          <p>Kirstie Dix</p>
          <p>5-7 RESOLUTION DR</p>
          <p>CARINGBAH</p>
          <p>NSW 2229 Australia</p>
        </div> */}
        <div className={styles.shipBlock}>
          <p className={styles.header}>Ship To</p>
          <p>
            {order?.shippingAddress?.firstName}{' '}
            {order?.shippingAddress?.lastName}
          </p>
          {order?.shippingAddress?.address1}
        </div>
      </div>
      <div className={styles.blockComments}>
        <span>Comments:</span>
      </div>
      <div className={styles.blockContent}>
        <table className={styles.tableDeliver}>
          <tr>
            <td>Delivered By</td>
            <td>Consignment Number:</td>
            <td>ABN</td>
            <td>Date</td>
          </tr>
          <tr>
            <td>{order?.fulfillmentStatus}</td>
            <td>PICK-UP-IN-STORE</td>
            <td>29 137 915 809</td>
            <td>{order?.processedAt}</td>
          </tr>
        </table>

        <table className={styles.tableDescription}>
          <thead>
            <th>Code</th>
            <th>Description</th>
            <th>Qty</th>
            <th>Unit Price</th>
            <th>Total Inc GST</th>
          </thead>
          {order?.lineItems?.nodes?.map((item, index: number) => {
            return (
              <tr key={index}>
                <td>{item?.variant?.id}</td>
                <td>{item.variant?.product.title}</td>
                <td>{item.quantity}</td>
                <td>
                  {Number(
                    item?.variant?.product.variants.nodes.map((item) => {
                      {
                        item.price
                      }
                    })
                  ).toFixed(2)}
                </td>
                <td>
                  {Number(
                    item?.variant?.product.variants.nodes.map((item) => {
                      {
                        item.price
                      }
                    })
                  ).toFixed(2)}
                </td>
              </tr>
            )
          })}
        </table>
      </div>
      <div className={styles.blockTotal}>
        <div className={styles.barcodeImage}></div>
        {/* <div className={styles.totalInformation}>
          <div>
            <div>Sub Total EX GST</div>
            <div>
              AUD$
              {(
                Number(order?.totalPriceSet.presentmentMoney.amount) -
                Number(order?.totalPriceSet.presentmentMoney.amount) / 11
              ).toFixed(2)}
            </div>
          </div>
          <div>
            <div>GST Total</div>
            <div>
              AUD$
              {(
                Number(order?.totalPriceSet.presentmentMoney.amount) / 11
              ).toFixed(2)}
            </div>
          </div>
          <div className={styles.boldText}>
            <div>Total</div>
            <div> AUD${order?.totalPriceSet.presentmentMoney.amount}</div>
          </div>
          <div className={styles.boldText}>
            <div>Payments</div>
            <div>AUD${order?.totalPriceSet.presentmentMoney.amount}</div>
          </div>
          <div>
            <div>Amount Owing</div>
            <div>AUD$0.00</div>
          </div>
        </div> */}
      </div>
    </div>
  )
}
