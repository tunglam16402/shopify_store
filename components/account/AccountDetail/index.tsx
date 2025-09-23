'use client'

import React, { useState } from 'react'
import AccountInfo from './AccountInfo'
import AddressList from './AddressList'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import DetailForm from './DetailForm'
import AddressForm from './AddressForm'
import { createCustomerAddressAction } from '@/actions/customer'

const AccountDetail: React.FC = () => {
  const { customer } = useSelector((state: RootState) => state.user)

  const [isEditing, setIsEditing] = useState(false)
  const [isAddingAddress, setIsAddingAddress] = useState(false)

  if (!customer) {
    return <p className="text-gray-500">No customer data available</p>
  }

  return (
    <div className="space-y-8">
      {/* ----- Account Info ----- */}
      <div className="space-y-4">
        <AccountInfo customer={customer} />

        {/* Nút Update - ẩn khi form đang mở */}
        {!isEditing && (
          <div className="flex justify-center">
            <button
              onClick={() => {
                setIsEditing(true)
                setIsAddingAddress(false) // đóng form Add Address nếu mở
              }}
              className="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Update
            </button>
          </div>
        )}

        {/* Form Update Account */}
        {isEditing && (
          <DetailForm
            customer={customer}
            onCancel={() => setIsEditing(false)}
          />
        )}
      </div>

      {/* ----- Address List ----- */}
      <div className="space-y-4">
        <AddressList
          addresses={customer?.addresses?.nodes ?? []}
          defaultAddressId={customer?.defaultAddress?.id ?? null}
        />

        {/* Nút Add Address - ẩn khi form đang mở */}
        {!isAddingAddress && (
          <div className="flex justify-center">
            <button
              onClick={() => {
                setIsAddingAddress(true)
                setIsEditing(false) // đóng form Update nếu mở
              }}
              className="px-4 py-2 text-sm bg-green-500 text-white rounded hover:bg-green-600 transition"
            >
              Add Address
            </button>
          </div>
        )}

        {/* Form Add Address */}
        {isAddingAddress && (
          <AddressForm
            actionType="create"
            actionFn={createCustomerAddressAction}
            onCancel={() => setIsAddingAddress(false)}
          />
        )}
      </div>
    </div>
  )
}

export default AccountDetail
