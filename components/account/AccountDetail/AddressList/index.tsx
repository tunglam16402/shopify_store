'use client'

import React, { useState } from 'react'
import AddressItem from '../AddressItem'
import { Address } from '@/types/customer/address'
import AddressForm from '../AddressForm'
import { createCustomerAddressAction, updateCustomerAddressAction } from '@/actions/customer'

interface AddressListProps {
  addresses: Address[]
  defaultAddressId?: string | null
}

const AddressList: React.FC<AddressListProps> = ({
  addresses,
  defaultAddressId,
}) => {
  const [editingAddress, setEditingAddress] = useState<Address | null>(null)

  const handleEdit = (address: Address) => {
    setEditingAddress(address)
  }

  const handleDelete = (id: string) => {
    // TODO: Gọi API xóa địa chỉ
    console.log('Delete address id:', id)
  }

  if (addresses.length === 0) {
    return (
      <p className="text-gray-500 text-sm">
        You do not have any saved addresses yet.
      </p>
    )
  }

  return (
    <div className="space-y-4">
      {/* Grid danh sách địa chỉ */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {addresses.map((address) => (
          <AddressItem
            key={address.id}
            address={address}
            isDefault={address.id === defaultAddressId}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {/* Form Edit Address */}
      {editingAddress && (
        <AddressForm
          actionType="edit"
          actionFn={updateCustomerAddressAction} 
          defaultValues={editingAddress}
          onCancel={() => setEditingAddress(null)}
        />
      )}
    </div>
  )
}

export default AddressList
