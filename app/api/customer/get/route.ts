// app/api/customer/route.ts
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getCustomer } from '@/shopify/customer/use-customer'

export async function GET() {
  const cookieStore = await cookies()
  const token = cookieStore.get('shopify_customer_token')?.value

  if (!token) {
    return NextResponse.json({ customer: null }, { status: 401 })
  }

  try {
    const customer = await getCustomer(token)
    return NextResponse.json({ customer })
  } catch (error) {
    console.error('Error fetching customer:', error)
    return NextResponse.json({ customer: null }, { status: 500 })
  }
}
