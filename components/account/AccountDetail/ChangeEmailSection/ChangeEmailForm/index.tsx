'use client'

import { changeCustomerEmailAction } from '@/actions/customer'
import { getFieldError } from '@/components/auth/helper'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { logoutUser } from '@/store/slices/userSlice'
import { useRouter } from 'next/navigation'
import { useActionState, useEffect, useState } from 'react'
import { useAppDispatch } from '@/lib/hooks/useAppDispatch'
import { ConfirmdDialog } from '@/components/ui/ConfirmDialog'

const initialState = {
  success: false,
  errors: [],
}

export default function ChangeEmailForm({
  onCancel,
}: {
  onCancel: () => void
}) {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [showSuccess, setShowSuccess] = useState(false)

  const [state, action, pending] = useActionState(
    changeCustomerEmailAction,
    initialState
  )

  useEffect(() => {
    if (state.success) {
      setShowSuccess(true)
    }
  }, [state.success])

  const handleConfirm = async () => {
    await dispatch(logoutUser())
    router.push('/account/login')
  }

  return (
    <>
      <form action={action} className="rounded-md border px-9 pt-5 pb-9">
        <h4 className="text-3xl font-bold uppercase">Change your email</h4>
        <p className="mt-4 text-sm text-gray-700 md:mt-6 md:text-base">
          Enter your new email below, after that you will return to Login.
        </p>
        <div className="mt-4">
          <Input
            name="newEmail"
            required
            label="New Email"
            className="w-full px-3 py-2"
            error={getFieldError(state.errors, 'email')}
          />
        </div>

        <div className="mt-6 flex items-center gap-4 md:mt-8">
          <Button
            type="submit"
            disabled={pending}
            variant={'primary'}
            className="flex-1 py-6 font-bold uppercase"
          >
            {pending ? 'Updating...' : 'Update Email'}
          </Button>

          <Button
            onClick={onCancel}
            className="flex-1 py-6 font-bold uppercase"
          >
            Cancel
          </Button>
        </div>
      </form>

      <ConfirmdDialog
        onConfirm={handleConfirm}
        open={showSuccess}
        title="Email changed successfully"
        subTitle="You will be redirected to the login page."
        confirmCtaText="Go to Login"
        close={() => setShowSuccess(false)}
      />
    </>
  )
}
