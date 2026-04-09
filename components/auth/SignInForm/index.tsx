'use client'

import { loginCustomer } from '@/actions/login'
import PasswordInput from '@/components/common/PasswordInput'
import { IcoArrowRight, IcoError, IcoSpin } from '@/components/icons'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { EventTracking, sendEventTracking } from '@/lib/analytics/klaviyo'
import { useAppDispatch } from '@/lib/hooks/useAppDispatch'
import { loadUserFromCookie } from '@/store/slices/userSlice'
import { hydrateCart } from '@/store/thunks/cartThunk'
import type { LoginState } from '@/types/auth'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useActionState, useEffect } from 'react'
import SocialLoginWrapper from '../SocialLogin/SocialLoginWrapper'
import { getFieldError } from '../helper'

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

  return (
    <div className="page-width">
      <div className="mx-auto w-full max-w-[560px] bg-white p-4 shadow-xl md:p-8">
        <h1 className="text-center text-3xl font-bold text-slate-900 uppercase sm:text-4xl">
          Login
        </h1>
        <form action={formAction} className="mt-8 space-y-4 md:mt-12">
          <div className="space-y-2">
            <div className="relative">
              <Input
                name="email"
                id="email"
                disabled={pending}
                label="Email"
                required
                error={getFieldError(state.errors, 'email')}
              />
            </div>

            <div className="mt-5 space-y-2">
              <div className="relative">
                <PasswordInput
                  name="password"
                  id="password"
                  disabled={pending}
                  required
                  label="Password"
                  error={getFieldError(state.errors, 'password')}
                />
              </div>
            </div>
          </div>

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

          <SocialLoginWrapper />
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          Dont have an account?
          <Link
            href="/account/register"
            className="text-primary pl-1 font-semibold transition-colors duration-200 hover:text-blue-700 hover:underline"
          >
            Create one now
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignInForm
