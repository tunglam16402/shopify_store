import OrderDetail from '@/components/account/OrderHistory/OrderDetail'
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

  const order = orders.find((item) => item.name === slug)

  if (!order) notFound()

  return (
    <div>
      <OrderDetail order={order} />
    </div>
  )
}

export default OrderDetailPage
