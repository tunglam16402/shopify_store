import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const body = await req.json()
  const { reviewId, type } = body as { reviewId: string; type: 'up' | 'down' }

  if (!reviewId || !type) {
    return NextResponse.json({ error: 'Missing reviewId or type' }, { status: 400 })
  }

  const votesCookie = req.cookies.get('review_votes')?.value ?? '{}'
  let votes: Record<string, 'up' | 'down'> = {}

  try {
    votes = JSON.parse(votesCookie)
  } catch {
    votes = {}
  }

  const prevVote = votes[reviewId] ?? null

  const { data: review, error } = await supabase
    .from('reviews')
    .select('vote_up, vote_down')
    .eq('id', reviewId)
    .single()

  if (error || !review) {
    return NextResponse.json({ error: 'Review not found' }, { status: 404 })
  }

  let vote_up = review.vote_up 
  let vote_down = review.vote_down 

  if (!prevVote) {
    if (type === 'up') vote_up++
    if (type === 'down') vote_down++
  }

  else if (prevVote === type) {
    return NextResponse.json({
      vote_up,
      vote_down,
      userVote: type,
      unchanged: true,
    })
  }

  else {
    if (prevVote === 'up' && type === 'down') {
      vote_up--
      vote_down++
    }
    if (prevVote === 'down' && type === 'up') {
      vote_down--
      vote_up++
    }
  }

  // update DB
  const { data: updated, error: updateError } = await supabase
    .from('reviews')
    .update({ vote_up, vote_down })
    .eq('id', reviewId)
    .select('vote_up, vote_down')
    .single()

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 })
  }

  // update cookie
  votes[reviewId] = type

  const response = NextResponse.json({
    vote_up: updated.vote_up,
    vote_down: updated.vote_down,
    userVote: type,
  })

  response.cookies.set('review_votes', JSON.stringify(votes), {
    path: '/',
    maxAge: 60 * 60 * 24 * 365, 
  })

  return response
}
