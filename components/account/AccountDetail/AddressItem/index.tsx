import { Button } from '@/components/ui/Button'
import { Address } from '@/types/customer/address'
import React from 'react'

export type AddressItemProps = {
  isDefault: boolean
  address: Address
  onEdit: (address: Address) => void
  onDelete: (id: string) => void
}

const AddressItem: React.FC<AddressItemProps> = ({
  address,
  isDefault = false,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="rounded-2xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-800 flex items-center gap-2">
          {address.firstName} {address.lastName}
        </h3>
        {isDefault && (
          <span className="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded-full">
            Default
          </span>
        )}
      </div>

      <div className="text-sm space-y-1 text-gray-700">
        <div>
          <span>
            Address: {address.address1}, {address.address2}
          </span>
        </div>
        <div>
          <span>City, State: {address.city}</span>
        </div>
        <div>
          <span>Country: {address.country}</span>
        </div>
        <div>
          <span>PostCode: {address.zip}</span>
        </div>
        {address.company && <p>Company: {address.company}</p>}
        {address.phone && <div>Phone: {address.phone}</div>}
      </div>

      <div className="flex gap-2 mt-4">
        <Button variant="secondary" onClick={() => onEdit(address)}>
          Edit
        </Button>
        <Button variant="destructive" onClick={() => onDelete(address.id!)}>
          Delete
        </Button>
      </div>
    </div>
  )
}

export default AddressItem
