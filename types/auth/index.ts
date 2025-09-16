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
