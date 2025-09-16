'use client'

import { useActionState, useEffect } from 'react'
import { registerCustomer } from '@/actions/register'
import type { RegisterState } from '@/types/auth'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { Button } from '@/components/ui/Button'

const initialState: RegisterState = {
  success: false,
  errors: [],
  customer: null,
}

const SignUpForm = () => {
  const [state, formAction, pending] = useActionState(
    registerCustomer,
    initialState
  )

  useEffect(() => {
    if (state.success) {
      console.log('Registration successful', state.customer)
    }
  }, [state])

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          name="email"
          id="email"
          required
          disabled={pending}
        />
      </div>

      <div>
        <Label htmlFor="phone">Phone Number</Label>
        <Input type="tel" name="phone" id="phone" required disabled={pending} />
      </div>

      <div>
        <Label htmlFor="firstName">First Name</Label>
        <Input type="text" name="firstName" id="firstName" disabled={pending} />
      </div>

      <div>
        <Label htmlFor="lastName">Last Name</Label>
        <Input type="text" name="lastName" id="lastName" disabled={pending} />
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          name="password"
          id="password"
          required
          disabled={pending}
        />
      </div>

      {/* Hiển thị lỗi từ server action */}
      {state.errors.length > 0 && (
        <ul className="text-red-500 text-sm space-y-1">
          {state.errors.map((error, index) => (
            <li key={index}>{error.message}</li>
          ))}
        </ul>
      )}

      {/* Hiển thị success message */}
      {state.success && (
        <p className="text-green-600">
          Register SuccessFully
        </p>
      )}

      <Button type="submit" disabled={pending} className="w-full">
        {pending ? 'Sending...' : 'Register'}
      </Button>
    </form>
  )
}

export default SignUpForm
