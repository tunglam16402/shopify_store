import React from 'react'
import AddressItem, { AddressItemProbs } from '../AddressItem'

interface AddressListProps {
  addresses: AddressItemProbs['address'][]
  defaultAddressId?: string | null
}

const AddressList: React.FC<AddressListProps> = ({
  addresses,
  defaultAddressId,
}) => {
  if (addresses.length === 0) {
    return (
      <p className="text-gray-500 text-sm">
        You do not have any saved addresses yet.
      </p>
    )
  }

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {addresses.map((address) => (
          <AddressItem
            key={address.id}
            address={address}
            isDefault={address.id === defaultAddressId}
          />
        ))}
      </div>
    </div>
  )
}

export default AddressList
