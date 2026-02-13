'use client'

import { updateDefaultAddressAction } from '@/actions/customer-address'
import { useAppDispatch } from '@/lib/hooks/useAppDispatch'
import { loadUserFromCookie } from '@/store/slices/userSlice'
import { Address } from '@/types/customer/address'
import React from 'react'
import AddAddressCard from '../AddAddressCard'
import AddressItem from '../AddressItem'
import { useRouter } from 'next/navigation'

interface AddressListProps {
  addresses: Address[]
  defaultAddressId?: string | null
  onEditAddress: (address: Address) => void
  onAddNew: () => void
  onDeleteAddress: (id: string) => void
  disableAdd?: boolean
}

const AddressList: React.FC<AddressListProps> = ({
  addresses,
  defaultAddressId,
  onEditAddress,
  onAddNew,
  onDeleteAddress,
  disableAdd,
}) => {
  const router = useRouter()

  const handleSetDefault = async (id: string) => {
    try {
      const res = await updateDefaultAddressAction(id)
      if (!res.success) {
        alert(res.errors?.[0]?.message || 'Failed to update default address')
        return
      }
      router.refresh()
    } catch (error) {
      console.error(error)
      alert('Unexpected error occurred.')
    }
  }

  return (
    <div className="mx-2 grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
      {!disableAdd && <AddAddressCard onClick={onAddNew} />}

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
          onDelete={() => onDeleteAddress(address.id || '')}
          onSetDefault={handleSetDefault}
        />
      ))}
    </div>
  )
}

export default AddressList
