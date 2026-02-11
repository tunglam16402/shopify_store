import {
  createCustomerAddressAction,
  updateCustomerAddressAction,
} from '@/actions/customer-address'
import { Customer } from '@/types/customer'
import { Address } from '@/types/customer/address'
import { useState } from 'react'
import AddressForm from './AddressForm'
import AddressList from './AddressList'
import Modal from '@/components/common/Modal'

interface IAddressBook {
  customer: Customer
}

const AddressBook = ({ customer }: IAddressBook) => {
  const [isAddingAddress, setIsAddingAddress] = useState(false)
  const [editingAddress, setEditingAddress] = useState<Address | null>(null)
  return (
    <div>
      <h3 className="text-[26px] font-bold uppercase md:text-3xl">
        address book
      </h3>
      <p className="my-4 text-sm md:my-6 md:text-base">
        You have {''}
        <span className="font-bold">3/5 address slots</span>
        {''} remaining.
      </p>
      <AddressList
        addresses={customer.addresses?.nodes ?? []}
        defaultAddressId={customer.defaultAddress?.id ?? null}
        onEditAddress={(address) => {
          setEditingAddress(address)
          setIsAddingAddress(false)
        }}
        onAddNew={() => {
          setIsAddingAddress(true)
          setEditingAddress(null)
        }}
      />

      {isAddingAddress && (
        <Modal
          isOpen={isAddingAddress}
          onClose={() => setIsAddingAddress(false)}
          className="w-full max-w-[1140px]"
        >
          <AddressForm
            actionType="create"
            actionFn={createCustomerAddressAction}
            onCancel={() => setIsAddingAddress(false)}
          />
        </Modal>
      )}

      {editingAddress && (
        <Modal
          isOpen={!!editingAddress}
          onClose={() => setEditingAddress(null)}
          className="w-full max-w-[1140px]"
        >
          <AddressForm
            actionType="edit"
            actionFn={updateCustomerAddressAction}
            defaultValues={editingAddress}
            onCancel={() => setEditingAddress(null)}
          />
        </Modal>
      )}
    </div>
  )
}

export default AddressBook
