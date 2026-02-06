import { AppError } from '../error'
import type { Address } from './address'
import { Order } from './order'

export interface Customer {
  id: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  createdAt: string
  acceptsMarketing: boolean
  defaultAddress?: Address | null
  orders: {
    nodes: Order[]
  }
  addresses: {
    nodes: Address[]
  }
  gender?: 'male' | 'female' | 'other' | null
  dateOfBirth?: string | null // YYYY-MM-DD
}

export interface UpdateCustomerState {
  success: boolean
  errors?: AppError[]
  customer?: {
    id: string
  } | null
  requireReLogin?: boolean
}

export interface ShopifyMetafield {
  value: string
  type: string
}

export interface ShopifyCustomerRaw {
  id: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  createdAt: string
  acceptsMarketing: boolean

  gender?: ShopifyMetafield | null
  dateOfBirth?: ShopifyMetafield | null

  defaultAddress?: Address | null
  orders: {
    nodes: Order[]
  }
  addresses: {
    nodes: Address[]
  }
}
