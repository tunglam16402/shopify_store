import { Address } from '@/types/customer/address'
import { shopifyFetch } from '../fetcher'
import {
  customerAddressCreateMutation,
  customerAddressDeleteMutation,
  customerAddressUpdateMutation,
} from '../utils/mutation'
import {
  CustomerAddressCreateMutation,
  CustomerAddressDeleteMutation,
  CustomerAddressUpdateMutation,
} from '../types/graphql'
import { parseShopifyCustomersErrors } from '@/lib/helper'

export async function createCustomerAddress(
  accessToken: string,
  address: Address
) {
  try {
    const data = await shopifyFetch<CustomerAddressCreateMutation>({
      query: customerAddressCreateMutation,
      variables: {
        customerAccessToken: accessToken,
        address,
      },
    })

    const payload = data.customerAddressCreate

    if (!payload) {
      return {
        success: false,
        errors: [{ field: [], message: 'Invalid Shopify response' }],
      }
    }

    const errors = parseShopifyCustomersErrors(payload)
    if (errors.length > 0) {
      return { success: false, errors }
    }

    if (!payload.customerAddress) {
      return {
        success: false,
        errors: [{ field: [], message: 'Address not created' }],
      }
    }

    return {
      success: true,
      data: payload,
    }
  } catch (error) {
    console.error('Error in createCustomerAddress:', error)
    return {
      success: false,
      errors: [{ field: [], message: 'Network error or Shopify unreachable' }],
    }
  }
}

export async function updateCustomerAddress(
  accessToken: string,
  id: string,
  address: Address
) {
  try {
    const data = await shopifyFetch<CustomerAddressUpdateMutation>({
      query: customerAddressUpdateMutation,
      variables: {
        customerAccessToken: accessToken,
        id,
        address,
      },
    })

    const errors = parseShopifyCustomersErrors(data.customerAddressUpdate)
    if (errors.length > 0) {
      return { success: false, errors }
    }

    return {
      success: true,
      data: data.customerAddressUpdate,
    }
  } catch (error) {
    console.error('Error in createCustomerAddres:', error)
    return {
      success: false,
      errors: [{ field: [], message: 'Network error or Shopify unreachable' }],
    }
  }
}

export async function deleteCustomerAddress(accessToken: string, id: string) {
  try {
    const data = await shopifyFetch<CustomerAddressDeleteMutation>({
      query: customerAddressDeleteMutation,
      variables: {
        customerAccessToken: accessToken,
        id,
      },
    })

    const errors = parseShopifyCustomersErrors(data.customerAddressDelete)
    if (errors.length > 0) {
      return { success: false, errors }
    }

    return {
      success: true,
      data: data.customerAddressDelete,
    }
  } catch (error) {
    console.error('Error in deleteCustomerAddres:', error)
    return {
      success: false,
      errors: [{ field: [], message: 'Network error or Shopify unreachable' }],
    }
  }
}
