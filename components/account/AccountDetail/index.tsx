'use client'

import React, { useState } from 'react'
import AccountInfo from './AccountInfo'
import AddressList from './AddressList'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import DetailForm from './DetailForm'
import AddressForm from './AddressForm'
import { createCustomerAddressAction } from '@/actions/customer-address'
import { Address } from '@/types/customer/address'
import ChangePasswordForm from './ChangePasswordForm'

const AccountDetail: React.FC = () => {
  const { customer } = useSelector((state: RootState) => state.user)

  const [isEditing, setIsEditing] = useState(false)
  const [isAddingAddress, setIsAddingAddress] = useState(false)
  const [editingAddress, setEditingAddress] = useState<Address | null>(null)

  if (!customer) {
    return <p className="text-gray-500">No customer data available</p>
  }

  const handleOpenUpdateCustomer = () => {
    setIsEditing(true)
    setIsAddingAddress(false)
    setEditingAddress(null)
  }

  const handleOpenAddAddress = () => {
    setIsAddingAddress(true)
    setIsEditing(false)
    setEditingAddress(null)
  }

  const handleOpenEditAddress = (address: Address) => {
    setEditingAddress(address)
    setIsEditing(false)
    setIsAddingAddress(false)
  }

  const handleCancelEditAddress = () => {
    setEditingAddress(null)
  }

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <AccountInfo customer={customer} />

        {!isEditing && (
          <div className="flex justify-center">
            <button
              onClick={handleOpenUpdateCustomer}
              className="rounded bg-blue-500 px-4 py-2 text-sm text-white transition hover:bg-blue-600"
            >
              Update
            </button>
          </div>
        )}

        {isEditing && (
          <DetailForm
            customer={customer}
            onCancel={() => setIsEditing(false)}
          />
        )}
      </div>

      <div className="space-y-4">
        <AddressList
          addresses={customer?.addresses?.nodes ?? []}
          defaultAddressId={customer?.defaultAddress?.id ?? null}
          onEditAddress={handleOpenEditAddress}
        />

        {!isAddingAddress && !editingAddress && (
          <div className="flex justify-center">
            <button
              onClick={handleOpenAddAddress}
              className="rounded bg-green-500 px-4 py-2 text-sm text-white transition hover:bg-green-600"
            >
              Add Address
            </button>
          </div>
        )}

        {isAddingAddress && (
          <AddressForm
            actionType="create"
            actionFn={createCustomerAddressAction}
            onCancel={() => setIsAddingAddress(false)}
          />
        )}

        {editingAddress && (
          <AddressForm
            actionType="edit"
            actionFn={createCustomerAddressAction}
            defaultValues={editingAddress}
            onCancel={handleCancelEditAddress}
          />
        )}
      </div>

      <div>
        <ChangePasswordForm userEmail={customer.email} />
      </div>
    </div>
  )
}

export default AccountDetail
