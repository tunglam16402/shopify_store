/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import Script from 'next/script'
import * as klaviyo from '@/lib/analytics/klaviyo'

const TIDIO_KEY = process.env.NEXT_PUBLIC_TIDIO_KEY!

const MainScript = () => {
  return (
    <>
      {process.env.NODE_ENV === 'production' && (
        <Script
          strategy="beforeInteractive"
          type="text/javascript"
          src={`https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=${klaviyo.KLAVIYO_API_KEY}`}
        />
      )}

      <Script src={`//code.tidio.co/${TIDIO_KEY}.js`} async></Script>
    </>
  )
}

export default MainScript
