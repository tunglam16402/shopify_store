import Tabs from '@/components/common/Tabs'
import React from 'react'
import { Account, Order } from '@/components/icons'
import AccountDetail from '../AccountDetail'
import OrderHistory from '../OrderHistory'

const profileTabs = [
  {
    label: 'Profile',
    icon: <Account />,
    key: 'profile',
    component: <AccountDetail />,
  },
  {
    label: 'Order History',
    icon: <Order />,
    key: 'orderH',
    component: <OrderHistory />,
  },
]

const AccountPage = () => {
  return (
    <div>
      <Tabs tabs={profileTabs} />
    </div>
  )
}

export default AccountPage
