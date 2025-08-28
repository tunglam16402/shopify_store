import { shopifyFetch } from '@/shopify/fetcher'
import { GetPredictiveSearchQuery } from '@/shopify/types/graphql'
import getPredictiveSearchQuery from '@/shopify/utils/query/get-search-predictive-query'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q') || ''

  if (query.length < 2) {
    return NextResponse.json({ products: [] })
  }

  try {
    const data = await shopifyFetch<GetPredictiveSearchQuery>({
      query: getPredictiveSearchQuery,
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
