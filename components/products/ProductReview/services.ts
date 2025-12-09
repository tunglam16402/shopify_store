/* eslint-disable @typescript-eslint/no-explicit-any */
export async function fetchReviews(payload: any) {
  const res = await fetch('/api/reviews', {
    method: 'POST',
    body: JSON.stringify(payload),
  })

  if (!res.ok) throw new Error('Failed to load reviews')

  return res.json()
}

export async function voteReview(payload: { reviewId: string; type: 'up' | 'down' }) {
  const res = await fetch('/api/reviews/vote', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    throw new Error(data.error || 'Failed to vote review')
  }

  return res.json()
}
