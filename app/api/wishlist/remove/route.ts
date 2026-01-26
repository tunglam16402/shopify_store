import { supabaseAdmin } from '@/utils/supabase/admin'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { userId, productId } = await req.json()

  if (!userId || !productId) {
    return NextResponse.json({ success: false }, { status: 400 })
  }

  const { error } = await supabaseAdmin
    .from('wishlists')
    .delete()
    .eq('user_id', userId)
    .eq('product_id', productId)

  if (error) {
    return NextResponse.json(
      { success: false, error },
      { status: 500 }
    )
  }

  return NextResponse.json({ success: true })
}
