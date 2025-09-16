import { shopifyFetch } from '../fetcher'
import { CustomerAccessTokenCreateMutation } from '../types/graphql'
import customerAccessTokenCreateMutation from '../utils/mutation/customer-access-token-create'

interface LoginInput {
  email: string
  password: string
}

export interface LoginError {
  code?: string
  field: string[]
  message: string
}

export interface LoginResult {
  success: boolean
  accessToken?: string
  expiresAt?: string
  errors?: LoginError[]
}

export async function createCustomerAccessToken(
  input: LoginInput
): Promise<LoginResult> {
  try {
    const data = await shopifyFetch<CustomerAccessTokenCreateMutation>({
      query: customerAccessTokenCreateMutation,
      variables: { input },
    })

    const result = data.customerAccessTokenCreate

    if (result?.customerUserErrors?.length) {
      return {
        success: false,
        errors: result.customerUserErrors.map((err) => ({
          code: err.code || undefined,
          field: err.field || [],
          message: err.message,
        })),
      }
    }

    if (result?.customerAccessToken) {
      return {
        success: true,
        accessToken: result.customerAccessToken.accessToken,
        expiresAt: result.customerAccessToken.expiresAt,
      }
    }

  } catch (err) {
    console.error('createCustomerAccessToken error:', err)
    return {
      success: false,
      errors: [{ field: [], message: 'Network or server error occurred.' }],
    }
  }
}
