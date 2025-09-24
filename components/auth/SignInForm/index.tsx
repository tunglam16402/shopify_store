'use client'

import { loginCustomer } from '@/actions/login'
import PasswordInput from '@/components/common/PasswordInput'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { useAppDispatch } from '@/lib/hooks/useAppDispatch'
import { loadUserFromCookie } from '@/store/slices/userSlice'
import type { LoginState } from '@/types/auth'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useActionState, useEffect } from 'react'

const initialState: LoginState = {
  success: false,
  accessToken: null,
  expiresAt: null,
  errors: [],
}

const SignInForm = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [state, formAction, pending] = useActionState(
    loginCustomer,
    initialState
  )

  useEffect(() => {
    if (state.success) {
      dispatch(loadUserFromCookie())
      router.push('/')
    }
  }, [state, router, dispatch])

  const getFieldError = (fieldName: string) =>
    state.errors.find((err) => err.field[0] === fieldName)?.message

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          name="email"
          id="email"
          placeholder="you@example.com"
          disabled={pending}
        />
        {getFieldError('email') && (
          <p className="text-sm text-red-500 mt-1">{getFieldError('email')}</p>
        )}
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <PasswordInput
          name="password"
          id="password"
          placeholder="Enter your password"
          disabled={pending}
        />
        {getFieldError('password') && (
          <p className="text-sm text-red-500 mt-1">
            {getFieldError('password')}
          </p>
        )}
      </div>

      <div>
        <Link
          href="/account/recovery"
          className="text-sm text-blue-600 hover:underline"
        >
          Forgot your password?
        </Link>
      </div>

      {state.errors.some((e) => e.field.length === 0) && (
        <ul className="text-red-500 text-sm space-y-1">
          {state.errors
            .filter((e) => e.field.length === 0)
            .map((error, index) => (
              <li key={index}>{error.message}</li>
            ))}
        </ul>
      )}

      <Button type="submit" disabled={pending} className="w-full">
        {pending ? 'Logging in...' : 'Login'}
      </Button>
    </form>
  )
}

export default SignInForm
