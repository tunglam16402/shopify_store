// lib/shopify.ts

export const SHOPIFY_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN!
export const SHOPIFY_TOKEN = process.env.SHOPIFY_STOREFRONT_TOKEN!

interface ShopifyFetchParams {
  query: string
  variables?: Record<string, any>
}

export async function shopifyFetch<T>({
  query,
  variables,
}: ShopifyFetchParams): Promise<T> {
  const res = await fetch(
    `https://${SHOPIFY_DOMAIN}/api/2025-07/graphql.json`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': SHOPIFY_TOKEN,
      },
      body: JSON.stringify({ query, variables }),
      next: { revalidate: 300 },
    }
  )

  const json = await res.json()

  if (json.errors) {
    console.error('Shopify query error:', JSON.stringify(json.errors, null, 2))
    throw new Error('Shopify query error')
  }

  return json.data
}
