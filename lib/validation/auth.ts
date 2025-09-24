// lib/validation/auth.ts
import { z } from 'zod'

/**
 * Common email field schema
 */
const emailSchema = z
  .string({ message: 'Email is required' })
  .trim()
  .min(1, 'Email is required')
  .email('Invalid email address')

/**
 * Password rules:
 * Shopify requires at least 8 characters.
 * You can expand with custom rules like uppercase, numbers, special characters, etc.
 */
const passwordSchema = z
  .string({ message: 'Password is required' })
  .min(8, 'Password must be at least 8 characters long')

/**
 * Login
 */
export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
})
export type LoginInput = z.infer<typeof loginSchema>

/**
 * Signup / Register
 */
export const signupSchema = z
  .object({
    firstName: z
      .string({ message: 'First name is required' })
      .trim()
      .min(1, 'First name is required'),
    lastName: z
      .string({ message: 'Last name is required' })
      .trim()
      .min(1, 'Last name is required'),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z
      .string({ message: 'Password confirmation is required' })
      .min(1, 'Password confirmation is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  })

export type SignupInput = z.infer<typeof signupSchema>

/**
 * Forgot password
 */
export const forgotPasswordSchema = z.object({
  email: emailSchema,
})
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>

/**
 * Reset password (via reset link)
 */
export const resetPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z
      .string({ message: 'Password confirmation is required' })
      .min(1, 'Password confirmation is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  })

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>

/**
 * Change password (user is logged in)
 */
export const changePasswordSchema = z
  .object({
    oldPassword: passwordSchema,
    newPassword: passwordSchema,
    confirmNewPassword: z
      .string({ message: 'New password confirmation is required' })
      .min(1, 'New password confirmation is required'),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    path: ['confirmNewPassword'],
    message: 'Passwords do not match',
  })
  .refine((data) => data.newPassword !== data.oldPassword, {
    path: ['newPassword'],
    message: 'New password cannot be the same as the old password',
  })

export type ChangePasswordInput = z.infer<typeof changePasswordSchema>
