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
    <form action={formAction} className="space-y-4 rounded-md border p-4">
      <div>
        <label className="block text-sm font-medium">First Name</label>
        <input
          name="firstName"
          defaultValue={customer.firstName ?? ''}
          className="w-full rounded border p-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Last Name</label>
        <input
          name="lastName"
          defaultValue={customer.lastName ?? ''}
          className="w-full rounded border p-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          type="email"
          name="email"
          defaultValue={customer.email ?? ''}
          className="w-full rounded border p-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Phone</label>
        <input
          type="phone"
          name="phone"
          defaultValue={customer.phone ?? ''}
          className="w-full rounded border p-2"
        />
      </div>

      <div className="flex justify-between gap-4">
        <button
          type="submit"
          disabled={isPending}
          className="rounded bg-green-500 px-4 py-2 text-white transition hover:bg-green-600"
        >
          {isPending ? 'Updating...' : 'Save'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded bg-gray-300 px-4 py-2 transition hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>

      {(state?.errors?.length ?? 0) > 0 && (
        <ul className="text-sm text-red-500">
          {state.errors?.map((err, idx) => (
            <li key={idx}>{err.message}</li>
          ))}
        </ul>
      )}

      {state.success && (
        <p className="text-sm text-green-500">Update successful!</p>
      )}
    </form>
  )
}

export default DetailForm
