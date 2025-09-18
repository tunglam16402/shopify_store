'use client'

import React, { useState } from 'react'
import AccountInfo from './AccountInfo'
import AddressList from './AddressList'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import DetailForm from './DetailForm'

const AccountDetail: React.FC = () => {
  const { customer } = useSelector((state: RootState) => state.user)
  const [isEditing, setIsEditing] = useState(false)

  if (!customer) {
    return <p className="text-gray-500">No customer data available</p>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Account Details</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          {isEditing ? 'Cancel' : 'Update'}
        </button>
      </div>

      {!isEditing ? (
        <AccountInfo customer={customer} />
      ) : (
        <DetailForm
          customer={customer}
          onCancel={() => setIsEditing(false)}
        />
      )}

      <AddressList
        addresses={customer?.addresses?.nodes ?? []}
        defaultAddressId={customer?.defaultAddress?.id ?? null}
      />
    </div>
  )
}

export default AccountDetail
