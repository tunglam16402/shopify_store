'use client'

import { loginCustomer } from '@/actions/login'
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
  }, [state, router])

  return (
    <form
      action={formAction}
      onSubmit={() => console.log('Form submit triggered')}
      className="space-y-4"
    >
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          name="email"
          id="email"
          placeholder="you@example.com"
          required
          disabled={pending}
        />
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          name="password"
          id="password"
          placeholder="Enter your password"
          required
          disabled={pending}
        />
      </div>

      <div>
        <Link
          href="/account/recovery"
          className="text-sm text-blue-600 hover:underline"
        >
          Forgot your password?
        </Link>
      </div>

      {state.errors.length > 0 && (
        <ul className="text-red-500 text-sm space-y-1">
          {state.errors.map((error, index) => (
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
