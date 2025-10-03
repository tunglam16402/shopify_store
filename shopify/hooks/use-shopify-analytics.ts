// import { usePathname } from 'next/navigation'
// import {
//   AnalyticsEventName,
//   getClientBrowserParameters,
//   sendShopifyAnalytics,
//   ShopifyAnalyticsProduct,
//   ShopifyPageViewPayload,
//   ShopifySalesChannel,
//   useShopifyCookies,
// } from '@shopify/hydrogen-react'
// import { currency, defaultLanguage } from '../../lib/constants'

// const SHOP_ID = process.env.NEXT_PUBLIC_SHOPIFY_SHOP_ID!

// type SendPageViewPayload = {
//   pageType?: string
//   products?: ShopifyAnalyticsProduct[]
//   collectionHandle?: string
//   searchString?: string
//   totalValue?: number
//   cartId?: string
// }

// type SendAddToCartPayload = {
//   cartId: string
//   products?: ShopifyAnalyticsProduct[]
//   totalValue?: ShopifyPageViewPayload['totalValue']
// }

// export function useShopifyAnalytics() {
//   const pathname = usePathname()
//   // Send page view event
//   const sendPageView = (
//     eventName: keyof typeof AnalyticsEventName,
//     payload?: SendPageViewPayload
//   ) => {
//     const eventPayload = {
//       ...getClientBrowserParameters(),
//       hasUserConsent: true,
//       shopifySalesChannel: ShopifySalesChannel.headless,
//       shopId: `gid://shopify/Shop/${SHOP_ID}`,
//       currency,
//       acceptedLanguage: defaultLanguage,
//       ...payload,
//     }

//     console.log('>>> Sending analytics event', eventName, eventPayload)

//     return sendShopifyAnalytics({
//       eventName,
//       payload: eventPayload,
//     })
//   }

//   // Send add to cart event
//   const sendAddToCart = ({
//     cartId,
//     totalValue,
//     products,
//   }: SendAddToCartPayload) => {
//     const browserParams = getClientBrowserParameters() // uniqueToken, visitToken, navigationType, navigationApi
//     const payload = {
//       cartId,
//       products,
//       totalValue,
//       shopId: `gid://shopify/Shop/${SHOP_ID}`,
//       shopifySalesChannel: ShopifySalesChannel.headless,
//       currency,
//       hasUserConsent: true,
//       ...browserParams,
//     }

//     return sendShopifyAnalytics({
//       eventName: AnalyticsEventName.ADD_TO_CART,
//       payload,
//     })
//   }

//   // Set up cookies for Shopify analytics & enable user consent
//   useShopifyCookies({
//     hasUserConsent: true,
//   })

//   return {
//     sendPageView,
//     sendAddToCart,
//     pathname,
//   }
// }

