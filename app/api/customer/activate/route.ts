import { shopifyFetch } from '@/shopify/fetcher'
import { CustomerActivateByUrlMutation } from '@/shopify/types/graphql'
import customerActivateByUrlMutation from '@/shopify/utils/mutation/customer-access-token-create'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { activationUrl, password } = await req.json()

    if (!activationUrl || !password) {
      return NextResponse.json(
        { success: false, error: 'Missing activationUrl or password' },
        { status: 400 }
      )
    }

    const data = await shopifyFetch<CustomerActivateByUrlMutation>({
      query: customerActivateByUrlMutation,
      variables: { activationUrl, password },
    })

    const result = data.customerActivateByUrl

    const errors = result?.customerUserErrors || []
    if (errors.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: errors.map((e) => e.message).join(', '),
        },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      accessToken: result?.customerAccessToken?.accessToken,
      expiresAt: result?.customerAccessToken?.expiresAt,
      customerId: result?.customer?.id,
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    )
  }
}
