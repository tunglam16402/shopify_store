import AccountPage from '@/components/account/AccountPage'
import { getCustomer } from '@/shopify/customer/use-customer'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const Account = async () => {
  const cookieStore = await cookies()
  const customerToken = cookieStore.get('shopify_customer_token')?.value

  if (!customerToken) {
    redirect('/account/login')
  }

  const customer = await getCustomer(customerToken)

  if (!customer) {
    redirect('/account/login')
  }

  return (
    <div>
      <AccountPage customer={customer} />
    </div>
  )
}

export default Account
