export type ErrorItem = {
  code?: string
  field: string[]
  message: string
}

export type LoginState = {
  success: boolean
  accessToken: string | null
  expiresAt: string | null
  errors: ErrorItem[]
}

export interface RegisterState {
  success: boolean
  errors: ErrorItem[]
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