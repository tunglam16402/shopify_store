'use client'

import React, { useState } from 'react'
import AccountInfo from './AccountInfo'
import AddressList from './AddressList'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import DetailForm from './DetailForm'
import AddressForm from './AddressForm'

const AccountDetail: React.FC = () => {
  const { customer } = useSelector((state: RootState) => state.user)

  const [isEditing, setIsEditing] = useState(false)
  const [isAddingAddress, setIsAddingAddress] = useState(false)

  if (!customer) {
    return <p className="text-gray-500">No customer data available</p>
  }

  return (
    <div className="space-y-6">
      {/* Header với 2 nút Update + Add Address */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Account Details</h2>
        <div className="flex space-x-2">
          {/* Nút Update Account */}
          <button
            onClick={() => {
              setIsAddingAddress(false) // đảm bảo không hiển thị form add khi đang update
              setIsEditing(!isEditing)
            }}
            className="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            {isEditing ? 'Cancel' : 'Update'}
          </button>

          {/* Nút Add Address */}
          <button
            onClick={() => {
              setIsEditing(false) // đảm bảo không hiển thị form update khi đang add
              setIsAddingAddress(!isAddingAddress)
            }}
            className="px-4 py-2 text-sm bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            {isAddingAddress ? 'Cancel' : 'Add Address'}
          </button>
        </div>
      </div>

      {/* Hiển thị form Update Account */}
      {!isEditing ? (
        <AccountInfo customer={customer} />
      ) : (
        <DetailForm customer={customer} onCancel={() => setIsEditing(false)} />
      )}

      {/* Hiển thị form Add Address */}
      {isAddingAddress && (
        <AddressForm onCancel={() => setIsAddingAddress(false)} />
      )}

      {/* Danh sách địa chỉ */}
      <AddressList
        addresses={customer?.addresses?.nodes ?? []}
        defaultAddressId={customer?.defaultAddress?.id ?? null}
      />
    </div>
  )
}

export default AccountDetail
