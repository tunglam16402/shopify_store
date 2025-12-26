/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
export const KLAVIYO_API_KEY = process.env.NEXT_PUBLIC_KLAVIYO_API_KEY

export const EventTracking = {
  TrackLoggedUsers: 'identify',
}
export interface IKlaviyoProduct {
  id: string
  title?: string
  // vendor?: string
  imageURL?: string
  handle?: string
  price?: number
  compareAtPrice?: number | null
}

export function trackViewedProduct(product: IKlaviyoProduct) {
  let klaviyo = window.klaviyo || []
  let item = {
    Name: product.title,
    ProductID: product.id.substring(product.id.lastIndexOf('/') + 1),
    ImageURL: product.imageURL || '',
    Handle: product.handle,
    // Brand: product.vendor,
    Price: product.price,
    Metadata: {
      // Brand: product.vendor,
      Price: product.price,
      CompareAtPrice: product.compareAtPrice,
    },
  }

  try {
    klaviyo?.track('Viewed Product', item)
    klaviyo?.trackViewedItem(item)
    console.log('[Klaviyo] Viewed Product sent:', item)
  } catch (err) {
    console.error('[Klaviyo] Failed:', err)
  }
}

export function trackAddedToCart(product: IKlaviyoProduct) {
  let klaviyo = window.klaviyo || []
  let item = {
    // Name: product.title,
    ProductID: product.id.substring(product.id.lastIndexOf('/') + 1),
    // ImageURL: product.imageURL,
    // // Handle: product.handle,
    // // Brand: product.vendor,
    // Price: product.price,
  }

  try {
    klaviyo?.track('Added To Cart', item)
    console.log('[Klaviyo] Add to cart sent:', item)
  } catch (err) {
    console.error('[Klaviyo] Failed:', err)
  }
}

export const sendEventTracking = (action: string, item: any) => {
  if (
    !!item?.email &&
    action === EventTracking.TrackLoggedUsers &&
    window?.klaviyo
  ) {
    const klaviyo = window?.klaviyo
    klaviyo?.identify({ email: item.email })
  }
}
