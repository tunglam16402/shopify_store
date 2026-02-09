'use client'

import { registerCustomer } from '@/actions/register'
import PasswordInput from '@/components/common/PasswordInput'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import type { RegisterState } from '@/types/auth'
import Link from 'next/link'
import { useActionState } from 'react'
import SocialLoginWrapper from '../SocialLogin/SocialLoginWrapper'
import {
  IcoArrowRight,
  IcoEmail,
  IcoName,
  IcoPassword,
  IcoPhone,
  IcoSpin,
} from '@/components/icons'

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

  const getFieldError = (fieldName: string) =>
    state.errors.find((err) => err.field[0] === fieldName)?.message

  return (
    <div className="page-width">
      <div className="mx-auto w-full max-w-[560px] bg-white p-4 shadow-xl md:p-8">
        <h1 className="text-center text-3xl font-bold text-slate-900 uppercase sm:text-4xl">
          Register
        </h1>
        <form action={formAction} className="mt-8 space-y-4 md:mt-12">
          <div className="space-y-2">
            <div className="relative">
              <Input
                name="email"
                id="email"
                disabled={pending}
                error={getFieldError('email')}
                required
                label="Email"
              />
            </div>

            <div className="relative mt-5">
              <Input
                type="tel"
                name="phone"
                id="phone"
                disabled={pending}
                error={getFieldError('phone')}
                label="Phone"
              />
            </div>

            <div className="relative mt-5">
              <Input
                type="text"
                name="firstName"
                id="firstName"
                disabled={pending}
                error={getFieldError('firstName')}
                label="First Name"
              />
            </div>

            <div className="relative mt-5">
              <Input
                type="text"
                name="lastName"
                id="lastName"
                disabled={pending}
                error={getFieldError('lastName')}
                label="Last Name"
              />
            </div>

            <div className="relative mt-5">
              <PasswordInput
                name="password"
                id="password"
                label="Password"
                disabled={pending}
                required
                error={getFieldError('password')}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-12">
            <Button
              type="submit"
              disabled={pending}
              variant={'primary'}
              className="h-12 w-full font-semibold shadow-lg"
            >
              {pending ? (
                <>
                  <IcoSpin />
                  Signing up...
                </>
              ) : (
                <>
                  Sign Up
                  <IcoArrowRight />
                </>
              )}
            </Button>
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-4 font-medium text-slate-500">
                Or continue with
              </span>
            </div>
          </div>

          {/* Social Login */}
          <SocialLoginWrapper />
        </form>

        {/* Sign Up Link */}
        <p className="mt-6 text-center text-sm text-slate-600">
          Already have an account?
          <Link
            href="/account/login"
            className="text-primary pl-1 font-semibold transition-colors duration-200 hover:text-blue-700 hover:underline"
          >
            Log In
          </Link>
        </p>
      </div>
    </div>

    // {state.errors.length > 0 && (
    //   <ul className="text-red-500 text-sm space-y-1">
    //     {state.errors.map((error, index) => (
    //       <li key={index}>{error.message}</li>
    //     ))}
    //   </ul>
    // )}

    // {state.success && <p className="text-green-600">Register SuccessFully</p>}
  )
}

export default SignUpForm
