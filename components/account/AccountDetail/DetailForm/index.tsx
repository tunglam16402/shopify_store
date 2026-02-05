'use client'
import { updateCustomerAction } from '@/actions/customer'
import { updateCustomerInfo } from '@/store/slices/userSlice'
import { Customer } from '@/types/customer'
import { useActionState, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

interface detailsFormProps {
  customer: Customer
  onCancel: () => void
}

const initialState = {
  success: false,
  errors: [],
  customer: null,
}

const DetailForm: React.FC<detailsFormProps> = ({ customer, onCancel }) => {
  const dispatch = useDispatch()
  const [state, formAction, pending] = useActionState(
    updateCustomerAction,
    initialState
  )

  const [formValues, setFormValues] = useState({
    firstName: customer?.firstName ?? '',
    lastName: customer?.lastName ?? '',
    phone: customer?.phone ?? '',
  })

  useEffect(() => {
    if (state.success) {
      dispatch(
        updateCustomerInfo({
          firstName: formValues.firstName,
          lastName: formValues.lastName,
          phone: formValues.phone,
        })
      )
      onCancel()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, state.success])

  return (
    <form action={formAction} className="space-y-4 rounded-md border p-4">
      <div>
        <label className="block text-sm font-medium">First Name</label>
        <input
          name="firstName"
          value={formValues.firstName}
          onChange={(e) =>
            setFormValues((prev) => ({
              ...prev,
              firstName: e.target.value,
            }))
          }
          className="w-full rounded border p-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Last Name</label>
        <input
          name="lastName"
          value={formValues.lastName}
          onChange={(e) =>
            setFormValues((prev) => ({
              ...prev,
              lastName: e.target.value,
            }))
          }
          className="w-full rounded border p-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          type="email"
          defaultValue={customer.email ?? ''}
          className="w-full rounded border bg-gray-200 p-2 text-gray-500"
          disabled
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Phone</label>

        <PhoneInput
          international={false}
          defaultCountry="VN"
          value={formValues.phone}
          onChange={(value) =>
            setFormValues((prev) => ({
              ...prev,
              phone: value ?? '',
            }))
          }
        />

        <input type="hidden" name="phone" value={formValues.phone} />
      </div>
      <div className="flex justify-between gap-4">
        <button
          type="submit"
          disabled={pending}
          className="rounded bg-green-500 px-4 py-2 text-white transition hover:bg-green-600"
        >
          {pending ? 'Updating...' : 'Save'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded bg-gray-300 px-4 py-2 transition hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
      {!pending && (state?.errors?.length ?? 0) > 0 && (
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
