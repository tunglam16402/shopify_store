import { Address } from '@/types/customer/address'
import React from 'react'

export type AddressItemProbs = {
  isDefault: boolean
  address: Address
}

const AddressItem: React.FC<AddressItemProbs> = ({
  address,
  isDefault = false,
}) => {
  return (
    <div className="rounded-2xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-800 flex items-center gap-2">
          {/* <User className="w-4 h-4 text-gray-500" /> */}
          {address.firstName} {address.lastName}
        </h3>
        {isDefault && (
          <span className="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded-full">
            Default
          </span>
        )}
      </div>
      <div className="text-sm space-y-1 text-gray-700">
        {address.company && (
          <p className="flex items-center gap-2">
            {/* <Building className="w-4 h-4 text-gray-400" /> */}
            {address.company}
          </p>
        )}
        <p className="flex items-center gap-2">
          {/* <MapPin className="w-4 h-4 text-gray-400" /> */}
          {address.address1}
          {address.address2 && `, ${address.address2}`}
          {address.city && `, ${address.city}`}
          {address.province && `, ${address.province}`}
          {address.country && `, ${address.country}`}
        </p>
        {address.zip && <p>ZIP: {address.zip}</p>}
        {address.phone && (
          <p className="flex items-center gap-2">
            {/* <Phone className="w-4 h-4 text-gray-400" /> */}
            {address.phone}
          </p>
        )}
      </div>
    </div>
  )
}

export default AddressItem
