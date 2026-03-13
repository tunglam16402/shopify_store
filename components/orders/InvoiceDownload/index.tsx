'use client'

import { Order } from '@/types/customer/order'
import { Document, Page, Text, View } from '@react-pdf/renderer'
import { styles } from './InvoiceDownload.styles'

export const InvoiceDownload = ({ order }: { order: Order }) => {
  const currency = order.totalPrice.currencyCode

  const format = (n: number) => `${currency} ${n.toFixed(2)}`

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* HEADER */}
        <View style={styles.header}>
          <View>
            <Text style={styles.brand}>PRINTWORK</Text>
            <Text style={styles.brandSub}>Premium Design Goods</Text>
            <Text>88 Tan Xuan, Xuan Dinh</Text>
            <Text>Bac Tu Liem, Ha Noi</Text>
            <Text>VietNam</Text>
            <Text>Phone: 0123 654 897</Text>
            <Text>printwork@ecommerce.com</Text>
          </View>

          <View style={styles.invoiceBox}>
            <Text style={styles.invoiceTitle}>INVOICE</Text>
            <Text style={styles.invoiceMeta}>#{order.name}</Text>
            <Text style={styles.invoiceMeta}>
              {new Date(order.processedAt).toLocaleDateString()}
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        {/* ADDRESS */}

        <View style={styles.addressWrapper}>
          <View style={styles.addressBlock}>
            <Text style={styles.label}>Bill To</Text>

            <Text style={styles.addressText}>
              {order.shippingAddress?.firstName}{' '}
              {order.shippingAddress?.lastName}
            </Text>

            <Text style={styles.addressText}>
              {order.shippingAddress?.address1}
            </Text>

            <Text style={styles.addressText}>
              {order.shippingAddress?.city} {order.shippingAddress?.zip}
            </Text>

            <Text style={styles.addressText}>
              {order.shippingAddress?.country}
            </Text>
          </View>

          <View style={styles.addressBlock}>
            <Text style={styles.label}>Order Info</Text>

            <Text style={styles.addressText}>
              Payment: {order.financialStatus}
            </Text>

            <Text style={styles.addressText}>
              Fulfillment: {order.fulfillmentStatus}
            </Text>

            <Text style={styles.addressText}>Email: {order.email}</Text>
          </View>
        </View>

        {/* ITEMS */}

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.colProduct, styles.headerText]}>Product</Text>

            <Text style={[styles.colSku, styles.headerText]}>SKU</Text>

            <Text style={[styles.colQty, styles.headerText]}>Qty</Text>

            <Text style={[styles.colPrice, styles.headerText]}>Price</Text>

            <Text style={[styles.colTotal, styles.headerText]}>Total</Text>
          </View>

          {order.lineItems.nodes.map((item, i) => {
            const price = Number(
              item.variant?.product.variants.nodes[0].price.amount
            )

            const total = price * item.quantity

            return (
              <View key={i} style={styles.tableRow}>
                <Text style={styles.colProduct}>
                  {item.variant?.product.title}
                </Text>

                <Text style={styles.colSku}>
                  {item.variant?.product.variants.nodes[0].sku || '-'}
                </Text>

                <Text style={styles.colQty}>{item.quantity}</Text>

                <Text style={styles.colPrice}>{format(price)}</Text>

                <Text style={styles.colTotal}>{format(total)}</Text>
              </View>
            )
          })}
        </View>

        {/* TOTALS */}

        <View style={styles.totals}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Subtotal</Text>
            <Text>{format(Number(order?.subtotalPrice?.amount))}</Text>
          </View>

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Shipping</Text>
            <Text>{format(Number(order.totalShippingPrice.amount))}</Text>
          </View>

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Tax</Text>
            <Text>{format(Number(order?.totalTax?.amount))}</Text>
          </View>

          <View style={[styles.totalRow, styles.grandRow]}>
            <Text>Total</Text>
            <Text>{format(Number(order.totalPrice.amount))}</Text>
          </View>
        </View>

        {/* FOOTER */}

        <Text style={styles.footer}>
          Thank you for shopping with Printwork.
        </Text>
      </Page>
    </Document>
  )
}
