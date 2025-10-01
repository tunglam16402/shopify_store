/* eslint-disable @typescript-eslint/no-explicit-any */

export const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!
export const SHOPIFY_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN!

interface ShopifyFetchParams {
  query: string
  variables?: Record<string, any>
  headers?: Record<string, string>
  cache?: RequestCache
}

export async function shopifyFetch<T>({
  query,
  variables,
  headers,
  cache = 'no-store',
}: ShopifyFetchParams): Promise<T> {
  const res = await fetch(
    `https://${SHOPIFY_DOMAIN}/api/2025-07/graphql.json`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': SHOPIFY_TOKEN,
        ...headers,
      },
      body: JSON.stringify({ query, variables }),
      cache,
    }
  )

  const json = await res.json()

  if (json.errors) {
    const throttled = json.errors.find(
      (e: any) => e.extensions?.code === 'THROTTLED'
    )
    if (throttled) {
      throw new Error('Too many requests. Please wait and try again.')
    }

    json.errors.forEach((err: any) => {
      console.error(
        `[Shopify Error] Code: ${err.extensions?.code}, Message: ${err.message}`
      )
    })
    throw new Error(json.errors[0].message)
  }

  return json.data
}
