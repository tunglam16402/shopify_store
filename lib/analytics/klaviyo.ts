export const KLAVIYO_API_KEY = process.env.NEXT_PUBLIC_KLAVIYO_API_KEY
export interface IKlaviyoProduct {
  name: string
  productID: string
  imageURL: string
  handle: string
  brand?: string
  price: string
  metadata?: {
    brand: string
    price: string
    compareAtPrice: string
  }
}

export interface IKlaviyoWishListProduct {
  name?: string
  productID: string
  imageURL?: string
  url?: string
  price?: string
}

export const EventTracking = {
  TrackLoggedUsers: 'identify',
}

export function trackViewedProduct(product: Required<IKlaviyoProduct>) {
  const klaviyo = window?.klaviyo
  const item = {
    Name: product.name,
    ProductID: product.productID.split('/').pop(),
    ImageURL: product.imageURL,
    Handle: product.handle,
    Brand: product.brand,
    Price: product.price,
    Metadata: {
      Brand: product.metadata.brand,
      Price: product.metadata.price,
      CompareAtPrice: product.metadata.compareAtPrice,
    },
  }
  klaviyo?.track('Viewed Product', item)
  klaviyo?.trackViewedItem(item)
}

export function trackAddedToCart(product: IKlaviyoProduct) {
  const klaviyo = window?.klaviyo
  const item = {
    Name: product.name,
    ProductID: product.productID.split('/').pop(),
    ImageURL: product.imageURL,
    Handle: product.handle,
    // Brand: product.brand,
    Price: product.price,
  }

  klaviyo?.track('Added To Cart', item)
}

export function trackAddedToWishlist(product: IKlaviyoWishListProduct) {
  const klaviyo = window?.klaviyo
  const item = {
    Name: product.name,
    ProductID: product.productID.split('/').pop(),
    ImageURL: product.imageURL,
    URL: product.url,
    Price: product.price,
  }

  klaviyo.track('Added To Wishlist', item)
}

export function trackRemovedFromWishlist(product: IKlaviyoWishListProduct) {
  const klaviyo = window?.klaviyo

  const item = {
    Name: product.name,
    ProductID: product.productID.split('/').pop(),
    ImageURL: product.imageURL,
    URL: product.url,
    Price: product.price,
  }

  klaviyo.track('Removed From Wishlist', item)
}

// let identified = false

// export const sendEventTracking = (action: string, item: any) => {
//   if (identified) return

//   if (
//     !!item?.email &&
//     action === EventTracking.TrackLoggedUsers &&
//     window?.klaviyo
//   ) {
//     identified = true
//     window.klaviyo.identify({ email: item.email })
//   }
// }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
