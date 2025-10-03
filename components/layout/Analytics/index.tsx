/* eslint-disable react-hooks/exhaustive-deps */
// 'use client'

// import { useEffect } from 'react'
// import { AnalyticsEventName } from '@shopify/hydrogen-react'
// import { useShopifyAnalytics } from '@/shopify/hooks/use-shopify-analytics'

// export default function ShopifyAnalytics() {
//   const { sendPageView, pathname } = useShopifyAnalytics()
//   useEffect(() => {
//     sendPageView(AnalyticsEventName.PAGE_VIEW)
//     console.log('[ShopifyAnalytics] PAGE_VIEW sent for', pathname)
//   }, [pathname, sendPageView])

//   return null
// }

'use client'

import {
    AnalyticsEventName,
    getClientBrowserParameters,
    sendShopifyAnalytics,
    useShopifyCookies,
    type ShopifyPageViewPayload
} from '@shopify/hydrogen-react'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

const DEFAULT_SHOP_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN ?? 'shopif-y-dev-store.myshopify.com'
const DEFAULT_SHOP_ID = process.env.NEXT_PUBLIC_SHOPIFY_SHOP_ID ?? '94567858492'

type Props = {
  shopDomain?: string
  shopId?: string
  currency?: string
  acceptedLanguage?: string
}

declare global {
  interface Window {
    __sendShopifyPageView?: () => void
  }
}

export default function ShopifyAnalyticsClient({
  shopDomain = DEFAULT_SHOP_DOMAIN,
  shopId = DEFAULT_SHOP_ID,
}: Props) {
  const computeCookieDomain = () => {
    try {
      const hostname = window.location.hostname
      const parts = hostname.split('.')
      if (parts.length >= 2) return `.${parts.slice(-2).join('.')}`
      return hostname
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      return ''
    }
  }

  const cookieDomain = computeCookieDomain()

  console.log('cookieDomain :>> ', cookieDomain);
  console.log('shopDomain :>> ', shopDomain);
  console.log('shopId :>> ', shopId);

  useShopifyCookies({
    hasUserConsent: true,
    domain: cookieDomain,
    checkoutDomain: shopDomain,
  })

  const pathname = usePathname()
  const lastSentPath = useRef<string | null>(null)
  const sendingRef = useRef(false)

  async function sendPageView(path: string) {
    if (!shopId) return
    if (lastSentPath.current === path) return
    if (sendingRef.current) return
    sendingRef.current = true

    try {
      const clientParams = getClientBrowserParameters()
      const payload: ShopifyPageViewPayload = {
          shopId: `gid://shopify/Shop/${shopId}`,
          // currency,
          acceptedLanguage: "EN",
          hasUserConsent: true,
          analyticsAllowed: true,
          uniqueToken: clientParams.uniqueToken,
          visitToken: clientParams.visitToken,
          url: window.location.href,
          path: window.location.pathname,
          search: window.location.search,
          referrer: document.referrer,
          navigationApi: clientParams.navigationApi,
          currency: 'USD',
          title: '',
          userAgent: '',
          navigationType: ''
      }

      await sendShopifyAnalytics(
        {
          eventName: AnalyticsEventName.PAGE_VIEW,
          payload,
        },
        shopDomain
      )

      lastSentPath.current = path
      console.debug('[ShopifyAnalytics] page_view sent', path)
    } catch (err) {
      console.warn('[ShopifyAnalytics] send error', err)
    } finally {
      sendingRef.current = false
    }
  }

  useEffect(() => {
    if (typeof pathname === 'string') sendPageView(pathname)
  }, [pathname])

  useEffect(() => {
    window.__sendShopifyPageView = () => sendPageView(window.location.pathname)
    return () => {
      delete window.__sendShopifyPageView
    }
  }, [])

  return null
}