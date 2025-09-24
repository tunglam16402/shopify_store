'use client'

import { deleteCustomerAddressAction } from '@/actions/customer-address'
import { Address } from '@/types/customer/address'
import React from 'react'
import AddressItem from '../AddressItem'

interface AddressListProps {
  addresses: Address[]
  defaultAddressId?: string | null
  onEditAddress: (address: Address) => void
}

const AddressList: React.FC<AddressListProps> = ({
  addresses,
  defaultAddressId,
  onEditAddress,
}) => {
  const handleDelete = async (id: string) => {
    try {
      const res = await deleteCustomerAddressAction(id)
      if (res.success) {
        alert('Address deleted successfully!')
      } else {
        alert(res.errors?.[0]?.message || 'Failed to delete address')
      }
    } catch (error) {
      console.error(error)
      alert('Unexpected error occurred.')
    }
  }

  if (addresses.length === 0) {
    return <p className="text-gray-500 text-sm">No saved addresses yet.</p>
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {addresses.map((address) => (
          <AddressItem
            key={address.id}
            address={address}
            isDefault={address.id === defaultAddressId}
            onEdit={onEditAddress} 
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  )
}

export default AddressList
