import { Address } from '@/types/customer/address'
import { shopifyFetch } from '../fetcher'
import {
  customerAddressCreateMutation,
  customerAddressUpdateMutation,
} from '../utils/mutation'
import {
  CustomerAddressCreateMutation,
  CustomerAddressUpdateMutation,
} from '../types/graphql'
import { parseShopifyErrors } from '@/lib/helper'

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

    if (!data.customerAddressCreate?.customerAddress) {
      return null
    }

    const errors = parseShopifyErrors(data.customerAddressCreate)
    if (errors.length > 0) {
      return { success: false, errors }
    }

    return {
      success: true,
      data: data.customerAddressCreate,
    }
  } catch (error) {
    console.error('Error in createCustomerAddres:', error)
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

    const errors = parseShopifyErrors(data.customerAddressUpdate)
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
