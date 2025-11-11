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
import { useAppDispatch } from '@/lib/hooks/useAppDispatch'
import { loadUserFromCookie } from '@/store/slices/userSlice'
import type { LoginState } from '@/types/auth'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useActionState, useEffect } from 'react'
import SocialLoginWrapper from '../SocialLogin/SocialLoginWrapper'
import { EventTracking, sendEventTracking } from '@/lib/analytics/klaviyo'

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
      sendEventTracking(EventTracking.TrackLoggedUsers, {
        email: loginCustomer.name,
      })
      router.push('/')
    }
  }, [state, router, dispatch])

  const getFieldError = (fieldName: string) =>
    state.errors.find((err) => err.field[0] === fieldName)?.message

  return (
    <div className="w-full flex items-center justify-center mt-6 md:mt-12 main-width">
      <div className="w-full max-w-[560px] mt-6">
        <form action={formAction} className="space-y-4">
          <div className="bg-white rounded-2xl shadow-xl p-4 md:p-8">
            <div>
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-semibold text-slate-700"
                >
                  Email Address
                </Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <IcoEmail className="h-5 w-5" />
                  </div>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="you@example.com"
                    disabled={pending}
                    className="h-12 pl-12 rounded-xl"
                  />
                  {getFieldError('email') && (
                    <p className="text-sm text-red-500 mt-1">
                      {getFieldError('email')}
                    </p>
                  )}
                </div>

                <div className="space-y-2 mt-5">
                  <Label
                    htmlFor="password"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Password
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <IcoPassword className="h-5 w-5 z-10" />
                    </div>
                    <PasswordInput
                      name="password"
                      id="password"
                      placeholder="Enter your password"
                      disabled={pending}
                      className="h-12 pl-12 rounded-xl "
                    />
                    {getFieldError('password') && (
                      <p className="text-sm text-red-500 mt-1">
                        {getFieldError('password')}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between mt-5">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 rounded" />
                  <span className="text-sm text-slate-600">Remember me</span>
                </label>
                <Link
                  href="/account/recovery"
                  className="text-sm font-medium text-primary hover:opacity-80 transition-colors duration-200"
                >
                  Forgot password?
                </Link>
              </div>

              {state.errors.some((e) => e.field.length === 0) && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
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
                  className="w-full h-12 font-semibold shadow-lg"
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
                <span className="px-4 bg-white text-slate-500 font-medium">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Social Login */}
            <SocialLoginWrapper />
          </div>
        </form>

        {/* Sign Up Link */}
        <p className="text-center mt-6 text-sm text-slate-600">
          Dont have an account?
          <Link
            href="/account/register"
            className="font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-200 hover:underline"
          >
            Create one now
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignInForm
