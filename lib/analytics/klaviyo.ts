/* eslint-disable @typescript-eslint/no-explicit-any */
export const KLAVIYO_API_KEY = process.env.NEXT_PUBLIC_KLAVIYO_API_KEY

export const EventTracking = {
  TrackViewedProduct: ['trackViewedItem'],
  TrackLoggedUsers: ['identify'],
  AddToCart: ['track', 'Added to Cart'],
  HydrogenViewedProduct: ['track', 'Hydrogen Viewed Product'],
  HydrogenAddedToCart: ['track', 'Hydrogen Added To Cart'],
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
  const klaviyo = window.klaviyo || []
  const item = {
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
  // klaviyo.push(['track', 'Hydrogen Viewed Product', item])
  // klaviyo.push(['trackViewedItem', item])
  klaviyo.track('Hydrogen Viewed Product', item)
  klaviyo.trackViewedItem(item)

  try {
    klaviyo.push(['track', 'Hydrogen Viewed Product', item])
    console.log('[Klaviyo] Viewed Product sent:', item)
  } catch (err) {
    console.error('[Klaviyo] Failed:', err)
  }

  // _learnq
  if (window._learnq) {
    window._learnq.push(['track', 'Viewed Product', item])
    window._learnq.push(['trackViewedItem', item])
  }
}

export function trackAddedToCart(product: IKlaviyoProduct) {
  const klaviyo = window.klaviyo || []
  const item = {
    // Name: product.title,
    ProductID: product.id.substring(product.id.lastIndexOf('/') + 1),
    // ImageURL: product.imageURL,
    // // Handle: product.handle,
    // // Brand: product.vendor,
    // Price: product.price,
  }
  // klaviyo.push(['track', 'Hydrogen Added To Cart', item])
  klaviyo.track('Hydrogen Added To Cart', item)

  try {
    klaviyo.push(['track', 'Hydrogen Add to Cart', item])
    console.log('[Klaviyo] Add to cart sent:', item)
  } catch (err) {
    console.error('[Klaviyo] Failed:', err)
  }

  // _learnq
  if (window._learnq) {
    window._learnq.push(['track', 'Added to Cart', item])
  }
}

export const sendEventTracking = (action: string[], item: any) => {
  if (typeof window !== 'undefined' && window._learnq) {
    window._learnq.push([...action, { ...item }])
  }
}
