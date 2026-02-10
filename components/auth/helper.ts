import { AppError } from '@/types/error'

export function getFieldError(
  errors: AppError[] | undefined,
  fieldName: string
): string | undefined {
  return errors?.find((err) => err.field.includes(fieldName))?.message
}
