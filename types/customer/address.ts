import { AppError } from '../error'

export type Address = {
  id?: string

  address1?: string | null
  address2?: string | null
  city?: string | null
  company?: string | null
  country?: string | null
  countryCodeV2?: string | null

  firstName?: string | null
  lastName?: string | null
  phone?: string | null

  province?: string | null
  provinceCode?: string | null
  zip?: string | null

  name?: string | null
  formatted?: string[]
}


export interface CreateAddressState {
  success: boolean
  address?: Address
  errors: AppError[]
}

export interface UpdateAddressState {
  success: boolean
  id?: string
  address?: Address
  errors: AppError[]
}
