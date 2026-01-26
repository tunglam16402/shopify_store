import { supabaseAdmin } from '@/utils/supabase/admin'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { userId } = await req.json()

  if (!userId) {
    return NextResponse.json({ productIds: [] })
  }

  const { data, error } = await supabaseAdmin
    .from('wishlists')
    .select('product_id')
    .eq('user_id', userId)

  if (error) {
    return NextResponse.json(
      { productIds: [] },
      { status: 500 }
    )
  }

  return NextResponse.json({
    productIds: data.map((item) => item.product_id),
  })
}
