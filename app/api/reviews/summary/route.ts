import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()

    const body = await req.json()
    const { productIds } = body

    if (!Array.isArray(productIds) || productIds.length === 0) {
      return NextResponse.json({ error: 'Missing productIds' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('reviews')
      .select('product_id, rating')
      .in('product_id', productIds)

    if (error) {
      return NextResponse.json(
        { error: 'Failed to fetch summary' },
        { status: 500 }
      )
    }

    const map: Record<string, { total: number; sum: number }> = {}

    for (const r of data || []) {
      if (!map[r.product_id]) {
        map[r.product_id] = { total: 0, sum: 0 }
      }

      map[r.product_id].total += 1
      map[r.product_id].sum += r.rating || 0
    }

    const summaryMap: Record<
      string,
      { avgRating: number; totalReviews: number }
    > = {}

    for (const id in map) {
      summaryMap[id] = {
        totalReviews: map[id].total,
        avgRating: Number((map[id].sum / map[id].total).toFixed(2)),
      }
    }

    return NextResponse.json(summaryMap)
  } catch (err) {
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 })
  }
}
