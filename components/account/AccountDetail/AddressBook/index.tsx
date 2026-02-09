import {
    createCustomerAddressAction,
    updateCustomerAddressAction,
} from '@/actions/customer-address'
import { Customer } from '@/types/customer'
import { Address } from '@/types/customer/address'
import { useState } from 'react'
import AddressForm from './AddressForm'
import AddressList from './AddressList'

interface IAddressBook {
  customer: Customer
}

const AddressBook = ({ customer }: IAddressBook) => {
  const [isAddingAddress, setIsAddingAddress] = useState(false)
  const [editingAddress, setEditingAddress] = useState<Address | null>(null)
  return (
    <div className="space-y-6">
      <AddressList
        addresses={customer.addresses?.nodes ?? []}
        defaultAddressId={customer.defaultAddress?.id ?? null}
        onEditAddress={(address) => {
          setEditingAddress(address)
          setIsAddingAddress(false)
        }}
      />

      {!isAddingAddress && !editingAddress && (
        <button
          onClick={() => setIsAddingAddress(true)}
          className="rounded bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-700"
        >
          Add new address
        </button>
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
          actionFn={updateCustomerAddressAction}
          defaultValues={editingAddress}
          onCancel={() => setEditingAddress(null)}
        />
      )}
    </div>
  )
}

export default AddressBook
