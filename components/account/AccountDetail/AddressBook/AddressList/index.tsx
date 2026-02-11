'use client'

import {
  deleteCustomerAddressAction,
  updateDefaultAddressAction,
} from '@/actions/customer-address'
import { Address } from '@/types/customer/address'
import React from 'react'
import AddressItem from '../AddressItem'
import AddAddressCard from '../AddAddressCard'
import { updateCustomerDefaultAddress } from '@/shopify/customer-address/use-address'

interface AddressListProps {
  addresses: Address[]
  defaultAddressId?: string | null
  onEditAddress: (address: Address) => void
  onAddNew: () => void
}

const AddressList: React.FC<AddressListProps> = ({
  addresses,
  defaultAddressId,
  onEditAddress,
  onAddNew,
}) => {
  const handleDelete = async (id: string) => {
    try {
      const res = await deleteCustomerAddressAction(id)
      if (!res.success) {
        alert(res.errors?.[0]?.message || 'Failed to delete address')
      }
    } catch (error) {
      console.error(error)
      alert('Unexpected error occurred.')
    }
  }

  const handleSetDefault = async (id: string) => {
    try {
      const res = await updateDefaultAddressAction(id)
      if (!res.success) {
        alert(res.errors?.[0]?.message || 'Failed to update default address')
      }
    } catch (error) {
      console.error(error)
      alert('Unexpected error occurred.')
    }
  }

  return (
    <div className="mx-2 grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
      <AddAddressCard onClick={onAddNew} />

      {addresses.length === 0 && (
        <div className="col-span-full py-10 text-center text-sm text-gray-500">
          You haven’t saved any addresses yet.
        </div>
      )}

      {addresses.map((address) => (
        <AddressItem
          key={address.id}
          address={address}
          isDefault={address.id === defaultAddressId}
          onEdit={onEditAddress}
          onDelete={handleDelete}
          onSetDefault={handleSetDefault}
        />
      ))}
    </div>
  )
}

export default AddressList
