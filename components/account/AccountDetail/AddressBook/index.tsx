import {
  createCustomerAddressAction,
  deleteCustomerAddressAction,
  updateCustomerAddressAction,
} from '@/actions/customer-address'
import { Customer } from '@/types/customer'
import { Address } from '@/types/customer/address'
import { useState } from 'react'
import AddressForm from './AddressForm'
import AddressList from './AddressList'
import Modal from '@/components/common/Modal'
import { loadUserFromCookie } from '@/store/slices/userSlice'
import { useAppDispatch } from '@/lib/hooks/useAppDispatch'
import { ConfirmdDialog } from '@/components/ui/ConfirmDialog'

interface IAddressBook {
  customer: Customer
}

const AddressBook = ({ customer }: IAddressBook) => {
  const dispatch = useAppDispatch()

  const [isAddingAddress, setIsAddingAddress] = useState(false)
  const [editingAddress, setEditingAddress] = useState<Address | null>(null)
  const [deletingAddress, setDeletingAddress] = useState<string | null>(null)

  const addresses = customer.addresses?.nodes ?? []
  const MAX_ADDRESSES = 5
  const isMaxReached = addresses.length >= MAX_ADDRESSES

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteCustomerAddressAction(id)
      if (!res.success) {
        alert(res.errors?.[0]?.message || 'Failed to delete address')
        return
      }

      await dispatch(loadUserFromCookie())
    } catch (error) {
      console.error(error)
      alert('Unexpected error occurred.')
    }
  }

  return (
    <div>
      <h3 className="text-[26px] font-bold uppercase md:text-3xl">
        address book
      </h3>
      <p className="my-4 text-sm md:my-6 md:text-base">
        You have{' '}
        <span className="font-bold">
          {MAX_ADDRESSES - addresses.length}/{MAX_ADDRESSES} address slots
        </span>{' '}
        remaining
        {isMaxReached && (
          <span> - Delete an address in order to add a new one.</span>
        )}
      </p>
      <AddressList
        addresses={addresses ?? []}
        defaultAddressId={customer.defaultAddress?.id ?? null}
        onEditAddress={(address) => {
          setEditingAddress(address)
        }}
        onAddNew={() => {
          if (isMaxReached) return
          setIsAddingAddress(true)
        }}
        disableAdd={isMaxReached}
        onDeleteAddress={(id) => setDeletingAddress(id)}
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

      {deletingAddress && (
        <ConfirmdDialog
          onConfirm={() => {
            handleDelete(deletingAddress)
            setDeletingAddress(null)
          }}
          open={!!deletingAddress}
          title="You're about to delete this address"
          subTitle="This action cannot be undone."
          confirmCtaText="Delete"
          close={() => setDeletingAddress(null)}
        />
      )}
    </div>
  )
}

export default AddressBook
