import { createCustomerAddressAction } from '@/actions/customer'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import React, { useActionState } from 'react'

interface addressFormProps {
  onCancel: () => void
}

const initialState = {
  success: false,
  errors: [],
  // accessToken: null,
}

const AddressForm: React.FC<addressFormProps> = ({ onCancel }) => {
  const [state, formAction, isPending] = useActionState(
    createCustomerAddressAction,
    initialState
  )

  return (
    <form action={formAction} className="space-y-4 border p-4 rounded-md">
      <div>
        <Label className="text-sm font-medium">First Name</Label>
        <Input name="firstName" className="border rounded p-2 w-full" />
      </div>

      <div>
        <Label className="text-sm font-medium">Last Name</Label>
        <Input name="lastName" className="border rounded p-2 w-full" />
      </div>

      <div>
        <Label className="text-sm font-medium">Company</Label>
        <Input name="company" className="border rounded p-2 w-full" />
      </div>

      <div>
        <Label className="text-sm font-medium">Phone</Label>
        <Input
          type="phone"
          name="phone"
          className="border rounded p-2 w-full"
        />
      </div>

      <div>
        <Label className="text-sm font-medium">Address 1</Label>
        <Input name="address1" className="border rounded p-2 w-full" />
      </div>

      <div>
        <Label className="text-sm font-medium">Address 2</Label>
        <Input name="address2" className="border rounded p-2 w-full" />
      </div>

      <div>
        <Label className="text-sm font-medium">City,State</Label>
        <Input name="city" className="border rounded p-2 w-full" />
      </div>

      <div>
        <Label className="text-sm font-medium">Country</Label>
        <Input name="country" className="border rounded p-2 w-full" />
      </div>

      <div>
        <Label className="text-sm font-medium">Postcode</Label>
        <Input name="zip" className="border rounded p-2 w-full" />
      </div>

      <div className="flex justify-between gap-4">
        <button
          type="submit"
          disabled={isPending}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          {isPending ? 'Updating...' : 'Save'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
        >
          Cancel
        </button>
      </div>

      {/* Hiển thị lỗi */}
      {state.errors.length > 0 && (
        <ul className="text-red-500 text-sm">
          {state.errors.map((err, idx) => (
            <li key={idx}>{err.message}</li>
          ))}
        </ul>
      )}

      {/* Hiển thị thành công */}
      {state.success && (
        <p className="text-green-500 text-sm">Update successful!</p>
      )}
    </form>
  )
}

export default AddressForm
