import OrderDetail from '@/components/orders/OrderDetail'
import { getOrderShippingMethod } from '@/shopify/customer/use-order'
import { notFound, redirect } from 'next/navigation'
import { getUserOrders } from '../services'

type Props = {
  params: Promise<{ slug: string }>
}

const OrderDetailPage = async ({ params }: Props) => {
  const { slug } = await params
  const orders = await getUserOrders()
  if (!orders) redirect('/account/login')
  if (!orders?.length) notFound()

  const orderDetail = orders.find((item) => item.name === slug)
  const shippingMethod = await getOrderShippingMethod(orderDetail?.id ?? '')

  if (!orderDetail) notFound()

  return (
    <div>
      <OrderDetail
        order={orderDetail}
        isViewInvoice={!!orderDetail}
        isLoggedIn={true}
        shippingMethod={shippingMethod}
      />
    </div>
  )
}

export default OrderDetailPage
