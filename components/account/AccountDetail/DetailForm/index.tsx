'use client'
import { updateCustomerAction } from '@/actions/customer'
import { Customer } from '@/types/customer'
import { useActionState } from 'react'

interface detailsFormProps {
  customer: Customer
  onCancel: () => void
}

const initialState = {
  success: false,
  errors: [],
  customer: null,
  accessToken: null,
}

const DetailForm: React.FC<detailsFormProps> = ({ customer, onCancel }) => {
  const [state, formAction, isPending] = useActionState(
    updateCustomerAction,
    initialState
  )

  return (
    <form action={formAction} className="space-y-4 border p-4 rounded-md">
      <div>
        <label className="block text-sm font-medium">First Name</label>
        <input
          name="firstName"
          defaultValue={customer.firstName ?? ''}
          className="border rounded p-2 w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Last Name</label>
        <input
          name="lastName"
          defaultValue={customer.lastName ?? ''}
          className="border rounded p-2 w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          type="email"
          name="email"
          defaultValue={customer.email ?? ''}
          className="border rounded p-2 w-full"
        />
      </div>

         <div>
        <label className="block text-sm font-medium">Phone</label>
        <input
          type="phone"
          name="phone"
          defaultValue={customer.phone ?? ''}
          className="border rounded p-2 w-full"
        />
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

export default DetailForm
