import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import PhoneInput from 'react-phone-number-input'

import React, { useActionState } from 'react'
import {
  Address,
  CreateAddressState,
  UpdateAddressState,
} from '@/types/customer/address'

interface AddressFormProps {
  onCancel: () => void
  defaultValues?: Partial<Address>
  actionType: 'create' | 'edit'
  actionFn: (
    initialState: CreateAddressState | UpdateAddressState,
    formData: FormData
  ) => Promise<CreateAddressState | UpdateAddressState>
}

const initialState = {
  success: false,
  errors: [],
}

const AddressForm: React.FC<AddressFormProps> = ({
  onCancel,
  defaultValues = {},
  actionType,
  actionFn,
}) => {
  const [state, formAction, isPending] = useActionState(actionFn, initialState)

  return (
    <form action={formAction} className="space-y-4 rounded-md border p-4">
      {actionType === 'edit' && defaultValues.id && (
        <input type="hidden" name="id" value={defaultValues.id} />
      )}

      <div>
        <Input
          name="firstName"
          defaultValue={defaultValues.firstName || ''}
          label="First Name"
          required
          error=""
        />
      </div>

      <div>
        <Input
          name="lastName"
          defaultValue={defaultValues.lastName || ''}
          label="Last Name"
        />
      </div>

      <div>
        <Input
          name="company"
          defaultValue={defaultValues.company || ''}
          label="Company"
        />
      </div>

      <div>
        <Input
          name="phone"
          defaultValue={defaultValues.phone || ''}
          label="Phone"
        />
      </div>

      <div>
        <Input
          name="address1"
          defaultValue={defaultValues.address1 || ''}
          label="Address 1"
        />
      </div>

      <div>
        <Input
          name="address2"
          defaultValue={defaultValues.address2 || ''}
          label="Address 2"
        />
      </div>

      <div>
        <Input
          name="city"
          defaultValue={defaultValues.city || ''}
          label="City"
        />
      </div>

      <div>
        <Input
          name="province"
          defaultValue={defaultValues.province || ''}
          label="Province"
        />
      </div>

      <div>
        <Input
          name="country"
          defaultValue={defaultValues.country || ''}
          label="Country"
        />
      </div>

      <div>
        <Input
          name="zip"
          defaultValue={defaultValues.zip || ''}
          label="Postcode"
        />
      </div>

      <div className="flex justify-between gap-4">
        <button
          type="submit"
          disabled={isPending}
          className="rounded bg-green-500 px-4 py-2 text-white transition hover:bg-green-600"
        >
          {isPending
            ? actionType === 'edit'
              ? 'Updating...'
              : 'Saving...'
            : 'Save'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded bg-gray-300 px-4 py-2 transition hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>

      {state.errors.length > 0 && (
        <ul className="text-sm text-red-500">
          {state.errors.map((err, idx) => (
            <li key={idx}>{err.message}</li>
          ))}
        </ul>
      )}

      {state.success && (
        <p className="text-sm text-green-500">
          {actionType === 'edit'
            ? 'Address updated successfully!'
            : 'Address created successfully!'}
        </p>
      )}
    </form>
  )
}

export default AddressForm
