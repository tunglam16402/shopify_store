'use client'

import { verifyCustomerPasswordAction } from '@/actions/customer'
import { getFieldError } from '@/components/auth/helper'
import PasswordInput from '@/components/common/PasswordInput'
import { Button } from '@/components/ui/Button'
import { ConfirmdDialog } from '@/components/ui/ConfirmDialog'
import { useActionState, useEffect } from 'react'

const initialState = {
  success: false,
  errors: [],
}

export default function VerifyPasswordForm({
  email,
  onVerified,
  onCancel,
}: {
  email: string | undefined
  onVerified: () => void
  onCancel: () => void
}) {
  const [state, action, pending] = useActionState(
    verifyCustomerPasswordAction,
    initialState
  )

  useEffect(() => {
    if (state.success) {
      onVerified()
    }
  }, [state.success, onVerified])

  return (
    <form action={action} className="rounded-md border px-9 pt-5 pb-9">
      <h4 className="text-3xl font-bold uppercase">
        Authenticate your account
      </h4>
      <p className="mt-4 text-sm text-gray-700 md:mt-6 md:text-base">
        For security reasons, please confirm your password to change your email.
      </p>
      <div className="mt-4">
        <input type="hidden" name="email" value={email} />

        <PasswordInput
          name="password"
          label="Current password"
          required
          error={getFieldError(state.errors, 'password')}
        />
      </div>

      <div className="mt-6 flex items-center gap-4 md:mt-8">
        <Button
          type="submit"
          disabled={pending}
          variant={'primary'}
          className="flex-1 py-6 font-bold uppercase"
        >
          {pending ? 'Verifying...' : 'Verify'}
        </Button>

        <Button onClick={onCancel} className="flex-1 py-6 font-bold uppercase">
          Cancel
        </Button>
      </div>
   
    </form>
  )
}
