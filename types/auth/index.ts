import { AppError } from '../error'

export type LoginState = {
  success: boolean
  accessToken: string | null
  expiresAt: string | null
  errors: AppError[]
}

export interface RegisterState {
  success: boolean
  errors: AppError[]
  customer: {
    id: string
    email?: string
    firstName?: string
    lastName?: string
    phone?: string
  } | null
}

export interface TypeState {
  success: boolean
  message?: string
  errors?: { field: string[]; message: string }[]
}
