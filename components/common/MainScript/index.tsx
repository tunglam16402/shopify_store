/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import Script from 'next/script'
import * as klaviyo from '@/lib/analytics/klaviyo'

const MainScript = () => {
  return (
    <>
      <Script
        strategy="beforeInteractive"
        // strategy="afterInteractive"
        async
        type="text/javascript"
        src={`https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=${klaviyo.KLAVIYO_API_KEY}`}
      />
    </>
  )
}

export default MainScript
