import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const product_id = searchParams.get('product_id')

  if (!product_id) {
    return NextResponse.json({ error: 'Missing product_id' }, { status: 400 })
  }

  const supabase = await createClient()
  const { data, error } = await supabase
    .from('reviews')
    .select(
      `
      *,
      review_media(*)
    `
    )
    .eq('product_id', product_id)
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  const reviews = data.map((reivew) => ({
    ...reivew,
    media: reivew.review_media ?? [],
  }))
  return NextResponse.json(reviews)
}
