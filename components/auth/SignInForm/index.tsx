'use client'

import { loginCustomer } from '@/actions/login'
import PasswordInput from '@/components/common/PasswordInput'
import {
  IcoArrowRight,
  IcoEmail,
  IcoError,
  IcoPassword,
  IcoSpin,
} from '@/components/icons'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { EventTracking, sendEventTracking } from '@/lib/analytics/klaviyo'
import { useAppDispatch } from '@/lib/hooks/useAppDispatch'
import { loadUserFromCookie } from '@/store/slices/userSlice'
import { hydrateCart } from '@/store/thunks/cartThunk'
import type { LoginState } from '@/types/auth'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useActionState, useEffect } from 'react'
import SocialLoginWrapper from '../SocialLogin/SocialLoginWrapper'

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

  console.log('state :>> ', state)

  useEffect(() => {
    const mergeCart = async () => {
      if (state.success && state.accessToken) {
        const currentUser = await dispatch(loadUserFromCookie()).unwrap()
        if (currentUser) {
          await dispatch(
            hydrateCart({ customerAccessToken: state.accessToken })
          ).unwrap()

          sendEventTracking(EventTracking.TrackLoggedUsers, {
            email: currentUser.email,
          })

          router.push('/')
        }
      }
    }

    mergeCart()
  }, [state.success, state.accessToken, dispatch, router])

  const getFieldError = (fieldName: string) =>
    state.errors.find((err) => err.field[0] === fieldName)?.message

  return (
    <div className="page-width mt-6 flex w-full items-center justify-center md:mt-12">
      <div className="mt-6 w-full max-w-[560px]">
        <form action={formAction} className="space-y-4">
          <div className="rounded-2xl bg-white p-4 shadow-xl md:p-8">
            <div>
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-semibold text-slate-700"
                >
                  Email Address
                </Label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                    <IcoEmail className="h-5 w-5" />
                  </div>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="you@example.com"
                    disabled={pending}
                    className="h-12 rounded-xl pl-12"
                  />
                  {getFieldError('email') && (
                    <p className="mt-1 text-sm text-red-500">
                      {getFieldError('email')}
                    </p>
                  )}
                </div>

                <div className="mt-5 space-y-2">
                  <Label
                    htmlFor="password"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Password
                  </Label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                      <IcoPassword className="z-10 h-5 w-5" />
                    </div>
                    <PasswordInput
                      name="password"
                      id="password"
                      placeholder="Enter your password"
                      disabled={pending}
                      className="h-12 rounded-xl pl-12"
                    />
                    {getFieldError('password') && (
                      <p className="mt-1 text-sm text-red-500">
                        {getFieldError('password')}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="mt-5 flex items-center justify-between">
                <label className="group flex cursor-pointer items-center gap-2">
                  <input type="checkbox" className="h-4 w-4 rounded" />
                  <span className="text-sm text-slate-600">Remember me</span>
                </label>
                <Link
                  href="/account/recovery"
                  className="text-primary text-sm font-medium transition-colors duration-200 hover:opacity-80"
                >
                  Forgot password?
                </Link>
              </div>

              {state.errors.some((e) => e.field.length === 0) && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-4">
                  <div className="flex gap-3">
                    <IcoError />
                    <ul className="space-y-1 text-sm text-red-700">
                      {state.errors
                        .filter((e) => e.field.length === 0)
                        .map((error, index) => (
                          <li key={index}>{error.message}</li>
                        ))}
                    </ul>
                  </div>
                </div>
              )}

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
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign In
                      <IcoArrowRight />
                    </>
                  )}
                </Button>
              </div>
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
          </div>
        </form>

        {/* Sign Up Link */}
        <p className="mt-6 text-center text-sm text-slate-600">
          Dont have an account?
          <Link
            href="/account/register"
            className="font-semibold text-blue-600 transition-colors duration-200 hover:text-blue-700 hover:underline"
          >
            Create one now
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignInForm
