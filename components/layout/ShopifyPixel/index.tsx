/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useEffect } from 'react'

export default function ShopifyPixelHeadless() {
  useEffect(() => {
    const publish = (eventName: string, payload: any) => {
      fetch('https://monorail-edge.shopifysvc.com/v1/produce_batch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          metadata: {
            event_created_at_ms: Date.now(),
            event_sent_at_ms: Date.now(),
            vendor: 'shopify',
          },
          events: [
            {
              schema_id: `web_pixels_custom_event/1.0`,
              payload: {
                name: eventName,
                ...payload,
              },
            },
          ],
        }),
      })
    }

    publish('page_viewed', {
      page_location: window.location.href,
      page_title: document.title,
    })
  }, [])

  return null
}
