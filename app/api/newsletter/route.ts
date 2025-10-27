import { NextResponse } from 'next/server'

const KLAVIYO_API_KEY = process.env.KLAVIYO_API_KEY!
const KLAVIYO_LIST_ID = process.env.KLAVIYO_LIST_ID!
const BASE_URL = 'https://a.klaviyo.com/api'

export async function POST(req: Request) {
  try {
    const { email } = await req.json()

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    const response = await fetch(`${BASE_URL}/profile-subscription-bulk-create-jobs/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Klaviyo-API-Key ${KLAVIYO_API_KEY}`,
        revision: '2024-10-15',
      },
      body: JSON.stringify({
        data: {
          type: 'profile-subscription-bulk-create-job',
          attributes: {
            profiles: {
              data: [
                {
                  type: 'profile',
                  attributes: {
                    email,
                  },
                },
              ],
            },
          },
          relationships: {
            list: {
              data: {
                type: 'list',
                id: KLAVIYO_LIST_ID,
              },
            },
          },
        },
      }),
    })

    if (!response.ok) {
      const errText = await response.text()
      console.error('Klaviyo error:', errText)
      throw new Error(`Klaviyo API error: ${errText}`)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Klaviyo API error:', error)
    return NextResponse.json({ error: 'Subscription failed' }, { status: 500 })
  }
}