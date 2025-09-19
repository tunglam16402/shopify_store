export type AppError = {
  field: string[]
  code?: string
  message: string
}

export type ActionResult<T> = {
  success: boolean
  data?: T
  errors?: AppError[]
}
