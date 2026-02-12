'use client'
import { updateCustomerAction } from '@/actions/customer'
import { updateCustomerInfo } from '@/store/slices/userSlice'
import { Customer } from '@/types/customer'
import { useActionState, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import 'react-phone-number-input/style.css'
import { DatePicker } from '@/components/ui/DoBInput'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { IcoSpin } from '@/components/icons'
import { PhoneInput } from '@/components/ui/PhoneInput'

interface IProfileUpdateForm {
  customer: Customer
  onCancel: () => void
}

const initialState = {
  success: false,
  errors: [],
  customer: null,
}

const ProfileUpdateForm: React.FC<IProfileUpdateForm> = ({
  customer,
  onCancel,
}) => {
  const dispatch = useDispatch()
  const [dob, setDob] = useState<Date | undefined>(
    customer.dateOfBirth ? new Date(customer.dateOfBirth) : undefined
  )
  const [state, formAction, pending] = useActionState(
    updateCustomerAction,
    initialState
  )

  const [formValues, setFormValues] = useState({
    firstName: customer.firstName ?? '',
    lastName: customer.lastName ?? '',
    phone: customer.phone ?? '',
    gender: customer.gender ?? '',
  })

  useEffect(() => {
    if (state.success) {
      dispatch(
        updateCustomerInfo({
          firstName: formValues.firstName,
          lastName: formValues.lastName,
          phone: formValues.phone,
          gender: formValues.gender,
          dateOfBirth: dob ? dob.toISOString().slice(0, 10) : null,
        })
      )
      onCancel()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.success])

  return (
    <form
      action={formAction}
      className="space-y-8 rounded-md border px-9 pt-5 pb-9"
    >
      <div className="">
        <h4 className="text-3xl font-bold uppercase">Edit your details</h4>
      </div>

      <Input
        name="firstName"
        value={formValues.firstName}
        onChange={(e) =>
          setFormValues((prev) => ({
            ...prev,
            firstName: e.target.value,
          }))
        }
        label="First Name"
      />

      <Input
        name="lastName"
        value={formValues.lastName}
        onChange={(e) =>
          setFormValues((prev) => ({
            ...prev,
            lastName: e.target.value,
          }))
        }
        label="Last Name"
      />

      <div className="">
        <label className="mb-2 block text-lg font-bold uppercase">
          Phone number
        </label>

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

      <div className="">
        <label className="mb-2 block text-lg font-bold uppercase">
          Date of birth
        </label>
        <DatePicker name="dateOfBirth" value={dob} onChange={setDob} />
      </div>

      <div className="">
        <label className="mb-2 block text-lg font-bold uppercase">Gender</label>

        <div className="flex gap-6 capitalize">
          {['male', 'female', 'other'].map((g) => (
            <label
              key={g}
              className="flex cursor-pointer items-center gap-2 text-base md:text-lg"
            >
              <input
                type="checkbox"
                name="gender"
                value={g}
                checked={formValues.gender === g}
                onChange={() =>
                  setFormValues((prev) => ({ ...prev, gender: g }))
                }
                className="accent-primary h-5 w-5 rounded-sm"
              />
              {g}
            </label>
          ))}
        </div>
      </div>

      <div className="gap-4">
        <Button
          variant={'primary'}
          type="submit"
          disabled={pending}
          className="mt-2 flex w-full max-w-[750px] items-center justify-between py-6 uppercase md:mt-4 md:text-lg"
        >
          <div> {pending ? 'Updating...' : 'update details'}</div>
          {!pending ? (
            <div className="text-3xl">→</div>
          ) : (
            <div className="animate-spin">
              <IcoSpin className="size-6" />
            </div>
          )}
        </Button>
        <Button
          variant={'outline'}
          type="button"
          onClick={onCancel}
          className="mt-3 flex w-full max-w-[750px] items-center justify-between py-6 uppercase md:mt-4 md:text-lg"
        >
          <div>Cancel</div>
          <div className="text-3xl">→</div>
        </Button>
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

export default ProfileUpdateForm
