import { NextResponse } from 'next/server'
import { shopifyFetch } from '@/lib/shopify'
import predictiveSearchQuery from '@/graphql/get-search-predictive-query'
import { PredictiveSearchQuery } from '@/types/shopify/graphql'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q') || ''

  if (query.length < 2) {
    return NextResponse.json({ products: [] })
  }

  try {
    const data = await shopifyFetch<PredictiveSearchQuery>({
      query: predictiveSearchQuery,
      variables: { query },
    })
    return NextResponse.json({
      products: data?.predictiveSearch?.products ?? [],
    })
  } catch (error) {
    console.error('API predictive search error:', error)
    return NextResponse.json({ products: [] })
  }
}
