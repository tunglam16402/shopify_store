import { activateCustomer } from '@/shopify/auth/use-signup'
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

    const result = await activateCustomer({ activationUrl, password })

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error:
            result.errors?.map((e) => e.message).join(', ') || 'Unknown error',
        },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      accessToken: result.accessToken,
      expiresAt: result.expiresAt,
      customer: result.customer,
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    )
  }
}
