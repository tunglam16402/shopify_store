'use server'
import { loginSchema } from '@/lib/validation/auth'
import { createCustomerAccessToken } from '@/shopify/auth/use-login'
import { recoverAccount, resetPasswordByUrl } from '@/shopify/auth/use-recover'
import { LoginState, TypeState } from '@/types/auth'
import { cookies } from 'next/headers'

export async function loginCustomer(
  initialState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const parseResult = loginSchema.safeParse({ email, password })
  if (!parseResult.success) {
    return {
      success: false,
      accessToken: null,
      expiresAt: null,
      errors: parseResult.error.issues.map((issue) => ({
        field: issue.path.map(String), // ví dụ ['email']
        message: issue.message,
      })),
    }
  }

  const result = await createCustomerAccessToken({ email, password })

  if (result.success && result.accessToken) {
    const cookieStore = await cookies()
    cookieStore.set('shopify_customer_token', result.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      expires: new Date(
        result.expiresAt || Date.now() + 30 * 24 * 60 * 60 * 1000
      ),
    })
  }

  const response: LoginState = {
    success: result.success,
    accessToken: result.accessToken ?? null,
    expiresAt: result.expiresAt ?? null,
    errors:
      result.errors?.map((err) => ({
        field: err.field || [],
        message: err.message,
      })) ?? [],
  }

  return response
}

//recovery account action
export async function recoveryCustomerAccount(
  formData: FormData
): Promise<TypeState> {
  const email = formData.get('email') as string

  if (!email) {
    return {
      success: false,
      errors: [{ field: [], message: 'Email is required' }],
    }
  }

  try {
    const result = await recoverAccount(email)
    if (!result.success) {
      return {
        success: false,
        message:
          result.errors?.[0]?.message || 'Failed to send recovery email.',
      }
    }

    return { success: true, message: 'Recovery email sent successfully.' }
  } catch (error) {
    console.error('recoveryCustomerAccount error:', error)
    return {
      success: false,
      message: 'Unexpected error during account recovery.',
    }
  }
}

//reset password action
export async function resetCustomerPassword(
  formData: FormData
): Promise<TypeState> {
  const password = formData.get('password') as string
  const resetUrl = formData.get('resetUrl') as string

  if (!password) {
    return {
      success: false,
      message: 'Password is required.',
    }
  }

  if (!resetUrl) {
    return {
      success: false,
      message: 'Missing resetUrl.',
    }
  }

  try {
    const result = await resetPasswordByUrl(resetUrl, password)

    if (!result.success) {
      return {
        success: false,
        message: result.errors?.[0]?.message || 'Failed to reset password.',
      }
    }

    return { success: true, message: 'Password reset successfully.' }
  } catch (error) {
    console.error('resetCustomerPassword error:', error)
    return {
      success: false,
      message: 'Unexpected error during password reset.',
    }
  }
}
