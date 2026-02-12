'use client'

import { useActionState, useEffect } from 'react'
import PasswordInput from '@/components/common/PasswordInput'
import { Button } from '@/components/ui/Button'
import { changeCustomerPasswordAction } from '@/actions/customer'
import { useDispatch } from 'react-redux'
import { logout } from '@/store/slices/userSlice'
import { useRouter } from 'next/navigation'
import { getFieldError } from '@/components/auth/helper'

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
      <h4 className="pb-4 text-[26px] font-bold uppercase md:text-3xl">
        Change Password
      </h4>

      <input type="hidden" name="email" value={userEmail} />

      <PasswordInput
        name="oldPassword"
        label="Current Password"
        disabled={pending}
        error={getFieldError(state.errors, 'oldPassword')}
      />

      <PasswordInput
        name="newPassword"
        label="New Password"
        disabled={pending}
        error={getFieldError(state.errors, 'newPassword')}
      />
      <PasswordInput
        name="confirmPassword"
        label="Confirm New Password"
        disabled={pending}
        error={getFieldError(state.errors, 'confirmPassword')}
      />

      {state.success && (
        <p className="text-green-600">Password changed successfully!</p>
      )}

      <div className="mt-6 flex md:mt-8">
        <Button
          type="submit"
          disabled={pending}
          className="ml-auto px-16 py-6 uppercase md:text-lg"
          variant="primary"
        >
          {pending ? 'Changing...' : 'Change Password'}
        </Button>
      </div>
    </form>
  )
}
