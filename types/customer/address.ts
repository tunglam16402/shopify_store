import { AppError } from '../error'

export type Address = {
  id?: string
  address1: string
  address2?: string | null
  city: string
  company?: string | null
  country: string
  countryCodeV2?: string | null
  firstName: string
  lastName: string
  phone?: string | null
  province: string
  provinceCode?: string | null
  zip: string
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
