import { createClient } from '@/prismicio'

export async function getNewsletterPopup() {
  const client = createClient()

  const newsletter = await client.getSingle('newsletter')

  return newsletter
}
