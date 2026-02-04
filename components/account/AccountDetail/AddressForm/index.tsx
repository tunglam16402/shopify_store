// import { createCustomerAddressAction } from '@/actions/customer'
// import { Input } from '@/components/ui/Input'
// import { Label } from '@/components/ui/Label'
// import React, { useActionState } from 'react'

// interface addressFormProps {
//   onCancel: () => void
// }

// const initialState = {
//   success: false,
//   errors: [],
//   // accessToken: null,
// }

// const AddressForm: React.FC<addressFormProps> = ({ onCancel }) => {
//   const [state, formAction, isPending] = useActionState(
//     createCustomerAddressAction,
//     initialState
//   )

//   return (
//     <form action={formAction} className="space-y-4 border p-4 rounded-md">
//       <div>
//         <Label className="text-sm font-medium">First Name</Label>
//         <Input name="firstName" className="border rounded p-2 w-full" />
//       </div>

//       <div>
//         <Label className="text-sm font-medium">Last Name</Label>
//         <Input name="lastName" className="border rounded p-2 w-full" />
//       </div>

//       <div>
//         <Label className="text-sm font-medium">Company</Label>
//         <Input name="company" className="border rounded p-2 w-full" />
//       </div>
//       <div>
//         <Label className="text-sm font-medium">Phone</Label>
//         <Input
//           type="phone"
//           name="phone"
//           className="border rounded p-2 w-full"
//         />
//       </div>
//       <div>
//         <Label className="text-sm font-medium">Address 1</Label>
//         <Input name="address1" className="border rounded p-2 w-full" />
//       </div>

//       <div>
//         <Label className="text-sm font-medium">Address 2</Label>
//         <Input name="address2" className="border rounded p-2 w-full" />
//       </div>

//       <div>
//         <Label className="text-sm font-medium">City,State</Label>
//         <Input name="city" className="border rounded p-2 w-full" />
//       </div>

//       <div>
//         <Label className="text-sm font-medium">Country</Label>
//         <Input name="country" className="border rounded p-2 w-full" />
//       </div>

//       <div>
//         <Label className="text-sm font-medium">Postcode</Label>
//         <Input name="zip" className="border rounded p-2 w-full" />
//       </div>

//       <div className="flex justify-between gap-4">
//         <button
//           type="submit"
//           disabled={isPending}
//           className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
//         >
//           {isPending ? 'Updating...' : 'Save'}
//         </button>
//         <button
//           type="button"
//           onClick={onCancel}
//           className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
//         >
//           Cancel
//         </button>
//       </div>

//       {state.errors.length > 0 && (
//         <ul className="text-red-500 text-sm">
//           {state.errors.map((err, idx) => (
//             <li key={idx}>{err.message}</li>
//           ))}
//         </ul>
//       )}

//       {state.success && (
//         <p className="text-green-500 text-sm">Update successful!</p>
//       )}
//     </form>
//   )
// }

// export default AddressForm

import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
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
    <form action={formAction} className="space-y-4 border p-4 rounded-md">
      {actionType === 'edit' && defaultValues.id && (
        <input type="hidden" name="id" value={defaultValues.id} />
      )}

      <div>
        <Label className="text-sm font-medium">First Name</Label>
        <Input
          name="firstName"
          defaultValue={defaultValues.firstName || ''}
          className="border rounded p-2 w-full"
        />
      </div>

      <div>
        <Label className="text-sm font-medium">Last Name</Label>
        <Input
          name="lastName"
          defaultValue={defaultValues.lastName || ''}
          className="border rounded p-2 w-full"
        />
      </div>

      <div>
        <Label className="text-sm font-medium">Company</Label>
        <Input
          name="company"
          defaultValue={defaultValues.company || ''}
          className="border rounded p-2 w-full"
        />
      </div>

      <div>
        <Label className="text-sm font-medium">Phone</Label>
        <Input
          type="phone"
          name="phone"
          defaultValue={defaultValues.phone || ''}
          className="border rounded p-2 w-full"
        />
      </div>

      <div>
        <Label className="text-sm font-medium">Address 1</Label>
        <Input
          name="address1"
          defaultValue={defaultValues.address1 || ''}
          className="border rounded p-2 w-full"
        />
      </div>

      <div>
        <Label className="text-sm font-medium">Address 2</Label>
        <Input
          name="address2"
          defaultValue={defaultValues.address2 || ''}
          className="border rounded p-2 w-full"
        />
      </div>

      <div>
        <Label className="text-sm font-medium">City</Label>
        <Input
          name="city"
          defaultValue={defaultValues.city || ''}
          className="border rounded p-2 w-full"
        />
      </div>

      <div>
        <Label className="text-sm font-medium">Province</Label>
        <Input
          name="province"
          defaultValue={defaultValues.province || ''}
          className="border rounded p-2 w-full"
        />
      </div>

      <div>
        <Label className="text-sm font-medium">Country</Label>
        <Input
          name="country"
          defaultValue={defaultValues.country || ''}
          className="border rounded p-2 w-full"
        />
      </div>

      <div>
        <Label className="text-sm font-medium">Postcode</Label>
        <Input
          name="zip"
          defaultValue={defaultValues.zip || ''}
          className="border rounded p-2 w-full"
        />
      </div>

      <div className="flex justify-between gap-4">
        <button
          type="submit"
          disabled={isPending}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
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
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
        >
          Cancel
        </button>
      </div>

      {state.errors.length > 0 && (
        <ul className="text-red-500 text-sm">
          {state.errors.map((err, idx) => (
            <li key={idx}>{err.message}</li>
          ))}
        </ul>
      )}

      {state.success && (
        <p className="text-green-500 text-sm">
          {actionType === 'edit'
            ? 'Address updated successfully!'
            : 'Address created successfully!'}
        </p>
      )}
    </form>
  )
}

export default AddressForm
