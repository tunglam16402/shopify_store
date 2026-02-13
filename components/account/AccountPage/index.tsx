import Tabs from '@/components/common/Tabs'
import React from 'react'
import { Account, Order } from '@/components/icons'
import AccountDetail from '../AccountDetail'
import OrderHistory from '../OrderHistory'
import { Customer } from '@/types/customer'

interface IAccountPage {
  customer: Customer
}

const AccountPage = ({ customer }: IAccountPage) => {
  const profileTabs = [
    {
      label: 'Profile',
      icon: <Account />,
      key: 'profile',
      component: <AccountDetail customer={customer} />,
    },
    {
      label: 'Order History',
      icon: <Order />,
      key: 'order',
      component: <OrderHistory customer={customer} />,
    },
  ]

  return (
    <div className="layout-width rounded-4xl bg-white">
      <Tabs tabs={profileTabs} />
    </div>
  )
}

export default AccountPage
