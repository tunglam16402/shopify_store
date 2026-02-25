import { Input } from '@/components/ui/Input'

import { getFieldError } from '@/components/auth/helper'
import { Button } from '@/components/ui/Button'
import {
  Address,
  CreateAddressState,
  UpdateAddressState,
} from '@/types/customer/address'
import { useRouter } from 'next/navigation'
import React, { useActionState, useEffect } from 'react'

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
  const router = useRouter()

  useEffect(() => {
    if (state.success) {
      router.refresh()
      onCancel()
    }
  }, [state.success])

  return (
    <div className="rounded-md border p-4">
      <h4 className="text-3xl font-bold uppercase">
        {actionType === 'edit' ? <>Edit address</> : <>adding new address</>}
      </h4>

      <form action={formAction} className="mt-6 space-y-4 md:mt-8 md:space-y-6">
        {actionType === 'edit' && defaultValues.id && (
          <input type="hidden" name="id" value={defaultValues.id} />
        )}
        <div>
          <div className="flex flex-col gap-4 md:flex-row">
            <Input
              name="firstName"
              defaultValue={defaultValues.firstName || ''}
              label="First Name"
              required
            />

            <Input
              name="lastName"
              defaultValue={defaultValues.lastName || ''}
              label="Last Name"
            />
          </div>
          <p className="mt-1 text-sm font-light md:text-base">
            Please enter name for your address item
          </p>
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
            name="address1"
            defaultValue={defaultValues.address1 || ''}
            label="Street Number/ Street Name"
          />
          <p className="mt-1 text-sm font-light md:text-base">
            Example: 33 Le Duan street,...
          </p>
        </div>

        <div>
          <Input
            name="address2"
            defaultValue={defaultValues.address2 || ''}
            label="Building Name/ Floor etc"
          />
          <p className="mt-1 text-sm font-light md:text-base">
            Example: Deutsches Haus; Block X1 - XYZ Apartment,...
          </p>
        </div>

        <div className="flex flex-col gap-4 md:flex-row">
          <Input
            name="country"
            defaultValue={defaultValues.country || ''}
            label="Country"
            error={getFieldError(state.errors, 'country')}
          />
          <Input
            name="city"
            defaultValue={defaultValues.city || ''}
            label="City"
          />
        </div>

        <div className="flex flex-col gap-4 md:flex-row">
          <Input
            name="province"
            defaultValue={defaultValues.province || ''}
            label="Province"
            error={getFieldError(state.errors, 'province')}
          />
          <Input
            name="zip"
            defaultValue={defaultValues.zip || ''}
            label="Postcode"
          />
        </div>
        <div>
          <Input
            name="phone"
            defaultValue={defaultValues.phone || ''}
            label="Phone"
            error={getFieldError(state.errors, 'phone')}
          />
          <p className="mt-1 text-sm font-light md:text-base">
            We will only call you if there are questions regarding your order.
          </p>
        </div>

        <div className="mt-6 flex justify-end gap-4 md:mt-8">
          <Button
            type="submit"
            variant={'primary'}
            disabled={isPending}
            className="rounded px-10 py-6 text-base md:px-16 md:text-lg"
          >
            {isPending
              ? actionType === 'edit'
                ? 'Updating...'
                : 'Saving...'
              : 'Save'}
          </Button>
          <Button
            onClick={onCancel}
            className="rounded px-10 py-6 text-base md:px-16 md:text-lg"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}

export default AddressForm
