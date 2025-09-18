'use client'

import { Customer } from '@/types/customer'
import React from 'react'

interface AccountInfoProps {
  customer: Customer | null
}

const AccountInfo: React.FC<AccountInfoProps> = ({ customer }) => {
  return (
    <div>
      <h3>Customer Information</h3>
      <div>
        <span>First Name</span>
        <span>{customer?.firstName}</span>
      </div>
      <div>
        <span>Last Name</span>
        <span>{customer?.lastName}</span>
      </div>
      <div>
        <span>Email</span>
        <span>{customer?.email}</span>
      </div>
      <div>
        <span>Phone</span>
        <span>{customer?.phone}</span>
      </div>
    </div>
  )
}

export default AccountInfo
