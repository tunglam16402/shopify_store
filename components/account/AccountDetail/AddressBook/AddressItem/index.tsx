import { Button } from '@/components/ui/Button'
import { Address } from '@/types/customer/address'
import React from 'react'
import cn from 'classnames'

export type AddressItemProps = {
  isDefault: boolean
  address: Address
  onEdit: (address: Address) => void
  onDelete: (id: string) => void
  onSetDefault: (id: string) => void
}

const AddressItem: React.FC<AddressItemProps> = ({
  address,
  isDefault = false,
  onEdit,
  onDelete,
  onSetDefault,
}) => {
  return (
    <div
      className={cn(
        'flex h-full flex-col border bg-gray-50 p-4 transition hover:shadow-lg',
        isDefault ? 'border-primary' : 'border-gray-300'
      )}
    >
      <div className="mb-3 flex items-center justify-between">
        <p className="flex items-center gap-2 font-bold">
          {address.firstName} {address.lastName}
        </p>
        {isDefault && (
          <span className="bg-primary rounded-md px-2 py-1 text-xs text-white md:text-sm">
            Default
          </span>
        )}
      </div>

      <div className="space-y-1 text-sm md:text-base">
        <div>
          <span>
            Address: {address.address2}, {address.address1}
          </span>
        </div>
        <div>
          <span>
            City, State/Province: {address.city}, {address.province}
          </span>
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

      <div className="mt-auto flex justify-between pt-4">
        {' '}
        <div className="flex gap-2">
          <Button variant="default" onClick={() => onEdit(address)}>
            Edit
          </Button>
          <Button variant="default" onClick={() => onDelete(address.id!)}>
            Delete
          </Button>
        </div>
        {!isDefault && (
          <button
            className="font-semibold underline hover:opacity-80"
            onClick={() => onSetDefault(address.id!)}
          >
            Set as Default
          </button>
        )}
      </div>
    </div>
  )
}

export default AddressItem
