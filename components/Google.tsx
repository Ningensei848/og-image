/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @next/next/next-script-for-ga */

import { useRouter } from 'next/router'
import { useEffect } from 'react'

const GTM_ID = process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID || ''
const Ad_ID = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID || ''
const Ad_Sidebar_ID = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_SIDEBAR_ID || ''

export const GoogleTagManager = (): JSX.Element => (
  // <Script
  <script
    id='script-for-gtm'
    // strategy='afterInteractive'
    dangerouslySetInnerHTML={{
      __html: `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${GTM_ID}');
      `
    }}
  />
)

/*
This component is used inside `_document.tsx`, so we should use <script /> instead of `<Script />` from 'next/script'
 */
export const GoogleTagManagerAlt = (): JSX.Element => (
  // cf. https://github.com/vercel/next.js/blob/a4159321b20148ff2f9f6fa847395a8c8162dbef/examples/with-google-tag-manager/pages/_document.js#L10-L17
  <noscript>
    <iframe
      title='GoogleTagManagerAlt'
      src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
      height='0'
      width='0'
      style={{ display: 'none', visibility: 'hidden' }}
    />
  </noscript>
)

export const GoogleAdsense = (): JSX.Element => (
  // <Script
  <script
    id='script-for-adsense'
    // strategy='lazyOnload'
    async
    src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${Ad_ID}`}
  />
)

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    adsbygoogle: any
  }
}

export const SidebarAds = ({ display }: { display: boolean }): JSX.Element => {
  const { asPath } = useRouter()

  useEffect(() => {
    try {
      if (!window || !display) return // SSR 処理中は skip
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      window.adsbygoogle = window.adsbygoogle || []
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      window.adsbygoogle.push({})
    } catch (err) {
      console.log(err)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [asPath])

  return (
    <ins
      key={asPath}
      className='adsbygoogle'
      style={{ display: 'block' }}
      data-ad-client={Ad_ID}
      data-ad-slot={Ad_Sidebar_ID} // 広告ユニット ID || cf. https://support.google.com/admob/answer/3016009?hl=ja
      data-ad-format='auto'
      data-full-width-responsive='true'
    />
  )
}
