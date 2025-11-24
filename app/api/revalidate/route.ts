import { NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'
import { headers } from 'next/headers'

export async function POST() {
  headers()

  revalidateTag('prismic', 'profile')

  return NextResponse.json({ revalidated: true, now: Date.now() })
}
