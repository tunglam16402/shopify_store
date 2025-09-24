'use client'

import { useActionState } from 'react'
import PasswordInput from '@/components/common/PasswordInput'
import { Button } from '@/components/ui/Button'
import { changeCustomerPasswordAction } from '@/actions/customer'

const initialState = {
  success: false,
  errors: [],
  customer: null,
  accessToken: null,
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

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="email" value={userEmail} />

      <PasswordInput
        name="oldPassword"
        placeholder="Enter your old password"
        required
        disabled={pending}
      />
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

      {state.errors.length > 0 && (
        <ul className="text-red-500 text-sm space-y-1">
          {state.errors.map((error, i) => (
            <li key={i}>{error.message}</li>
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
