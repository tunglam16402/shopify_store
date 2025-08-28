import { NextRequest, NextResponse } from 'next/server'
import { shopifyFetch } from '@/shopify/fetcher'
import { cartCreateMutation } from '@/shopify/utils/mutation'
import { CartCreateMutation } from '@/shopify/types/graphql'

export async function POST(req: NextRequest) {
  const { variantId, quantity } = await req.json()
  try {
    const data = await shopifyFetch<CartCreateMutation>({
      query: cartCreateMutation,
      variables: {
        input: {
          lines: [
            {
              merchandiseId: variantId,
              quantity,
            },
          ],
        },
      },
    })

    if (data.cartCreate?.userErrors.length) {
      return NextResponse.json(
        { error: data.cartCreate.userErrors },
        { status: 400 }
      )
    }

    return NextResponse.json({ cart: data.cartCreate?.cart })
  } catch (error) {
    console.error('API predictive search error:', error)
    return NextResponse.json({ products: [] })
  }
}
