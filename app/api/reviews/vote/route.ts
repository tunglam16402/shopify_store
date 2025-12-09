// // app/api/reviews/vote/route.ts
// import { NextRequest, NextResponse } from 'next/server'
// import { createClient } from '@/utils/supabase/server'

// const RATE_LIMIT_WINDOW = 10 * 1000 // 10 giây
// const RATE_LIMIT_MAX = 5 // tối đa 5 vote mỗi IP trong 10s
// const rateLimitCache = new Map<string, number[]>() // ip => [timestamp]

// export async function POST(req: NextRequest) {
//   const supabase = await createClient()
//   const body = await req.json()
//   const ip = req.headers.get('x-forwarded-for') || req.headers.get('host') || 'unknown'

//   const { reviewId, type } = body as { reviewId: string; type: 'up' | 'down' }

//   if (!reviewId || !type) {
//     return NextResponse.json({ error: 'Missing reviewId or type' }, { status: 400 })
//   }

//   // Rate limiting
//   const now = Date.now()
//   const timestamps = rateLimitCache.get(ip) || []
//   const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW)
//   if (recent.length >= RATE_LIMIT_MAX) {
//     return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
//   }
//   rateLimitCache.set(ip, [...recent, now])

//   // Lấy review hiện tại
//   const { data: review, error: fetchError } = await supabase
//     .from('reviews')
//     .select('vote_up, vote_down')
//     .eq('id', reviewId)
//     .single()

//   if (fetchError || !review) {
//     return NextResponse.json({ error: fetchError?.message || 'Review not found' }, { status: 404 })
//   }

//   const updatedFields: { vote_up?: number; vote_down?: number } = {}

//   if (type === 'up') {
//     updatedFields.vote_up = (review.vote_up ?? 0) + 1
//   } else if (type === 'down') {
//     updatedFields.vote_down = (review.vote_down ?? 0) + 1
//   }

//   const { error: updateError } = await supabase
//     .from('reviews')
//     .update(updatedFields)
//     .eq('id', reviewId)

//   if (updateError) {
//     return NextResponse.json({ error: updateError.message }, { status: 500 })
//   }

//   return NextResponse.json({
//     success: true,
//     vote_up: updatedFields.vote_up,
//     vote_down: updatedFields.vote_down,
//   })
// }

// app/api/reviews/vote/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const body = await req.json()

  const { reviewId, type } = body as { reviewId: string; type: 'up' | 'down' }

  if (!reviewId || !type) {
    return NextResponse.json(
      { error: 'Missing reviewId or type' },
      { status: 400 }
    )
  }

  const { data: review, error: fetchError } = await supabase
    .from('reviews')
    .select('vote_up, vote_down')
    .eq('id', reviewId)
    .single()

  if (fetchError || !review) {
    return NextResponse.json({ error: fetchError?.message || 'Review not found' }, { status: 404 })
  }

  const updatedFields: { vote_up?: number; vote_down?: number } = {}

  if (type === 'up') {
    updatedFields.vote_up = (review.vote_up ?? 0) + 1
  } else if (type === 'down') {
    updatedFields.vote_down = (review.vote_down ?? 0) + 1
  }

  const { error: updateError } = await supabase
    .from('reviews')
    .update(updatedFields)
    .eq('id', reviewId)

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 })
  }

  return NextResponse.json({ success: true, vote_up: updatedFields.vote_up, vote_down: updatedFields.vote_down })
}
