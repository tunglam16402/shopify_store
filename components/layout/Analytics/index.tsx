'use client'

import { useEffect } from 'react'
import { AnalyticsEventName } from '@shopify/hydrogen-react'
import { useShopifyAnalytics } from '@/shopify/hooks/use-shopify-analytics'

export default function ShopifyAnalytics() {
  const { sendPageView, pathname } = useShopifyAnalytics()
  useEffect(() => {
    sendPageView(AnalyticsEventName.PAGE_VIEW)
    console.log('[ShopifyAnalytics] PAGE_VIEW sent for', pathname)
  }, [pathname, sendPageView])

  return null
}
    