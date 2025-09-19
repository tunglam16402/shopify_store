import { AppError } from '../error'
import type { Address } from './address'
import { Order } from './order'

export interface Customer {
  id: string
  email: string
  firstName: string
  lastName: string
  phone?: string | null
  createdAt: string
  acceptsMarketing: boolean
  defaultAddress?: Address | null
  orders: {
    nodes: Order[]
  }
  addresses: {
    nodes: Address[]
  }
}

export interface UpdateCustomerState {
  success: boolean
  errors?: AppError[]
  customer?: {
    id: string
  } | null
  accessToken?: {
    accessToken: string
    expiresAt: string
  } | null
}
