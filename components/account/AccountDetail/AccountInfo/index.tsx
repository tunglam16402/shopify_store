'use client'

import { Customer } from '@/types/customer'
import React from 'react'
import InfoItem from './InfoItem'

interface AccountInfoProps {
  customer: Customer | null
}

const AccountInfo: React.FC<AccountInfoProps> = ({ customer }) => {

  console.log('customer :>> ', customer);
  return (
    <section className="mx-auto max-w-4xl px-4 py-10">
      <h3 className="mb-10 text-center text-2xl font-semibold">My Details</h3>

      <div className="grid grid-cols-1 gap-x-8 gap-y-10 text-center sm:grid-cols-3">
        <InfoItem label="First Name" value={customer?.firstName} />
        <InfoItem label="Last Name" value={customer?.lastName} />
        <InfoItem label="Date of Birth" value={customer?.dateOfBirth} />

        <InfoItem label="Phone Number" value={customer?.phone} />
        <InfoItem label="Email" value={customer?.email} />
        <InfoItem label="Gender" value={customer?.gender} />
      </div>
    </section>
  )
}

export default AccountInfo
