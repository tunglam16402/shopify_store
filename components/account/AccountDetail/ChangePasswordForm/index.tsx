'use client'

import { changeCustomerPasswordAction } from '@/actions/customer'
import { getFieldError } from '@/components/auth/helper'
import PasswordInput from '@/components/common/PasswordInput'
import { Button } from '@/components/ui/Button'
import { ConfirmdDialog } from '@/components/ui/ConfirmDialog'
import { useAppDispatch } from '@/lib/hooks/useAppDispatch'
import { logoutUser } from '@/store/slices/userSlice'
import { useRouter } from 'next/navigation'
import { useActionState, useEffect, useState } from 'react'

const initialState = {
  success: false,
  requireReLogin: false,
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
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    if (state.success && state.requireReLogin) {
      setShowSuccess(true)
    }
  }, [state.success, state.requireReLogin])

  const handleConfirm = async () => {
    await dispatch(logoutUser())
    router.push('/account/login')
  }

  return (
    <>
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
      <ConfirmdDialog
        onConfirm={handleConfirm}
        open={showSuccess}
        title="Password changed successfully"
        subTitle="You will be redirected to the login page."
        confirmCtaText="Go to Login"
        close={() => setShowSuccess(false)}
      />
    </>
  )
}
