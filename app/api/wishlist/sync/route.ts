import { supabaseAdmin } from '@/utils/supabase/admin'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { userId, productIds } = await req.json()

  if (!userId || !Array.isArray(productIds)) {
    return NextResponse.json({ wishlist: [] }, { status: 400 })
  }

  if (productIds.length) {
    const rows = productIds.map((productId: string) => ({
      user_id: userId,
      product_id: productId,
    }))

    const { error } = await supabaseAdmin
      .from('wishlists')
      .upsert(rows, {
        onConflict: 'user_id,product_id',
      })

    if (error) {
      return NextResponse.json(
        { wishlist: [], error },
        { status: 500 }
      )
    }
  }

  const { data, error } = await supabaseAdmin
    .from('wishlists')
    .select('product_id')
    .eq('user_id', userId)

  if (error) {
    return NextResponse.json(
      { wishlist: [] },
      { status: 500 }
    )
  }

  return NextResponse.json({
    wishlist: data.map((i) => i.product_id),
  })
}
