'use client'

import { useActionState, useEffect } from 'react'
import PasswordInput from '@/components/common/PasswordInput'
import { Button } from '@/components/ui/Button'
import { changeCustomerPasswordAction } from '@/actions/customer'
import { useDispatch } from 'react-redux'
import { logout } from '@/store/slices/userSlice'
import { useRouter } from 'next/navigation'

const initialState = {
  success: false,
  errors: [],
}

export default function ChangePasswordForm({
  userEmail,
}: {
  userEmail: string
}) {
  const [state, formAction, pending] = useActionState(
    changeCustomerPasswordAction,
    initialState
  )
  const dispatch = useDispatch()
  const router = useRouter()

  useEffect(() => {
    if (state.success && state.requireReLogin) {
      dispatch(logout())
      router.push('/account/login')
    }
  }, [state.success])

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="email" value={userEmail} />

      <PasswordInput
        name="oldPassword"
        placeholder="Enter your old password"
        required
        disabled={pending}
      />
      {state.errors?.find((e) => e.field.includes('oldPassword')) && (
        <p className="text-sm text-red-500">
          {state.errors.find((e) => e.field.includes('oldPassword'))?.message}
        </p>
      )}
      <PasswordInput
        name="newPassword"
        placeholder="Enter your new password"
        required
        disabled={pending}
      />
      <PasswordInput
        name="confirmPassword"
        placeholder="Confirm new password"
        required
        disabled={pending}
      />

      {(state?.errors?.length ?? 0) > 0 && (
        <ul className="text-sm text-red-500">
          {state.errors?.map((err, idx) => (
            <li key={idx}>{err.message}</li>
          ))}
        </ul>
      )}

      {state.success && (
        <p className="text-green-600">Password changed successfully!</p>
      )}

      <Button type="submit" disabled={pending} className="w-full">
        {pending ? 'Changing...' : 'Change Password'}
      </Button>
    </form>
  )
}
