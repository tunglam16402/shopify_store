'use client'

import Tabs from '@/components/common/Tabs'
import React from 'react'
import { Account, Order } from '@/components/icons'
import AccountDetail from '../AccountDetail'
import OrderHistory from '../OrderHistory'
import { Customer } from '@/types/customer'
import { useSearchParams } from 'next/navigation'

interface IAccountPage {
  customer: Customer
}

const AccountPage = ({ customer }: IAccountPage) => {
  const searchParams = useSearchParams()
  const tabParam = searchParams.get('tab')

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

  const validKeys = profileTabs.map((t) => t.key)
  const initialKey = validKeys.includes(tabParam ?? '')
    ? tabParam!
    : profileTabs[0].key

  return (
    <div className="layout-width rounded-4xl bg-white">
      <Tabs key={initialKey} tabs={profileTabs} defaultKey={initialKey} />
    </div>
  )
}

export default AccountPage
