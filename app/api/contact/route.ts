import { NextResponse } from 'next/server'

const KLAVIYO_API_KEY = process.env.KLAVIYO_API_KEY!
const BASE_URL = 'https://a.klaviyo.com/api'
const REVISION = '2024-10-15'

type ContactPayload = {
  name: string
  email: string
  phone: string
  message: string
}

const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

export async function POST(req: Request) {
  try {
    const { name, email, phone, message } = (await req.json()) as ContactPayload

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email and message are required' },
        { status: 400 }
      )
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    // 1) Create / update profile
    const profileResponse = await fetch(`${BASE_URL}/profiles/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Klaviyo-API-Key ${KLAVIYO_API_KEY}`,
        revision: REVISION,
      },
      body: JSON.stringify({
        data: {
          type: 'profile',
          attributes: {
            email,
            first_name: name,
            ...(phone ? { phone_number: phone } : {}),
            properties: {
              contact_source: 'website_contact_form',
              last_contact_message: message,
              last_contact_submitted_at: new Date().toISOString(),
            },
          },
        },
      }),
    })

    // Nếu profile đã tồn tại thì endpoint này có thể fail tuỳ case/revision/account rules
    // Ta vẫn đọc response để debug
    const profileText = await profileResponse.text()

    if (!profileResponse.ok) {
      console.error('Klaviyo profile error:', profileText)
      // Không return ngay — vì ta vẫn có thể track event nếu email hợp lệ
    }

    // 2) Track event: Contact Form Submitted
    const eventResponse = await fetch(`${BASE_URL}/events/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Klaviyo-API-Key ${KLAVIYO_API_KEY}`,
        revision: REVISION,
      },
      body: JSON.stringify({
        data: {
          type: 'event',
          attributes: {
            properties: {
              name,
              email,
              phone: phone || '',
              message,
              source: 'website_contact_form',
              submitted_at: new Date().toISOString(),
            },
            metric: {
              data: {
                type: 'metric',
                attributes: {
                  name: 'Contact Form Submitted',
                },
              },
            },
            profile: {
              data: {
                type: 'profile',
                attributes: {
                  email,
                  first_name: name,
                  ...(phone ? { phone_number: phone } : {}),
                },
              },
            },
          },
        },
      }),
    })

    const eventText = await eventResponse.text()

    if (!eventResponse.ok) {
      console.error('Klaviyo event error:', eventText)

      return NextResponse.json(
        { error: 'Failed to submit contact form to Klaviyo' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Contact form submitted successfully',
    })
  } catch (error) {
    console.error('Contact form error:', error)

    return NextResponse.json(
      { error: 'Something went wrong while submitting the form' },
      { status: 500 }
    )
  }
}