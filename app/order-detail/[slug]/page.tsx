import OrderDetail from '@/components/orders/OrderDetail'
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

  if (!orderDetail) notFound()

  return (
    <div>
      <OrderDetail
        order={orderDetail}
        isViewInvoice={!!orderDetail}
        isLoggedIn={true}
      />
    </div>
  )
}

export default OrderDetailPage
