import Head from 'next/head'
import type { AppProps } from 'next/app'

// cf. https://nextjs.org/docs/basic-features/built-in-css-support#import-styles-from-node_modules
import 'styles/global.css'
import 'styles/og-image.css'

// import { store } from 'stores'
import { usePageView } from 'libs/google'
import { GoogleTagManager, GoogleAdsense } from 'components/Google'

export default function MyApp({ Component, pageProps }: AppProps) {
  // https://github.com/vercel/next.js/blob/a4159321b20148ff2f9f6fa847395a8c8162dbef/examples/with-google-tag-manager/pages/_app.js#L7-L13
  usePageView()

  return (
    <>
      <Head>
        <title>Image Generator for OGP</title>
        <GoogleTagManager />
        <GoogleAdsense />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
