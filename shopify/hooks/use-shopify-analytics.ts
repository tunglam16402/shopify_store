// import {
//   AnalyticsEventName,
//   getClientBrowserParameters,
//   sendShopifyAnalytics,
//   ShopifyAnalyticsProduct,
//   ShopifyPageViewPayload,
//   ShopifySalesChannel,
//   useShopifyCookies,
// } from '@shopify/hydrogen-react'
// import { usePathname } from 'next/navigation'
// import { currency, defaultLanguage } from '../../lib/constants'

// const SHOP_ID = '94567858492'
// const SHOP_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN

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
//       shopifySalesChannel: ShopifySalesChannel.hydrogen,
//       shopId: `gid://shopify/Shop/${SHOP_ID}`,
//       currency,
//       acceptedLanguage: defaultLanguage,
//       ...payload,
//       analyticsAllowed: true,
//       marketingAllowed: true
//     }

//     return sendShopifyAnalytics({
//       eventName,
//       payload: eventPayload,
//     },SHOP_DOMAIN)
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
//       shopifySalesChannel: ShopifySalesChannel.hydrogen,
//       currency,
//       hasUserConsent: true,
//       ...browserParams,
//     }

//     return sendShopifyAnalytics(
//       {
//         eventName: AnalyticsEventName.ADD_TO_CART,
//         payload,
//       },
//       SHOP_DOMAIN
//     )
//   }

//   // Set up cookies for Shopify analytics & enable user consent
//   useShopifyCookies({
//     hasUserConsent: true,
//     domain: SHOP_DOMAIN,
//     checkoutDomain: SHOP_DOMAIN,
//   })

//   return {
//     sendPageView,
//     sendAddToCart,
//     pathname,
//   }
// }
