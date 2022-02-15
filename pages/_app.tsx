import Head from 'next/head'
import getConfig from 'next/config'
import { useRouter } from 'next/router'

// cf. https://nextjs.org/docs/basic-features/built-in-css-support#import-styles-from-node_modules
import 'styles/global.css'
import 'styles/og-image.css'

// import { store } from 'stores'
import { usePageView } from 'libs/google'
import { GoogleTagManager, GoogleAdsense } from 'components/Google'

import type { AppProps } from 'next/app'

const DefaultTitle =
  'This `App` supports not only **Markdown**, _but also_<br />**Emoji** 🎉🎊🍾🥳 _and_<br /> $\\KaTeX$'
const getOGImageUrl = (base: string, asPath: string) => {
  const url = new URL(`https://${process.env.NEXT_PUBLIC_API_HOST}`)
  const basePath = base.replace(/^\//, '').replace(/\/$/, '')
  // NEXT_PUBLIC_API_HOST が指定されていれば pathPrefix は `api` （外部に API サーバがある場合）
  // そうでなければ，basePath をみて pathPrefix を決める（内部に自前で API サーバを持つ場合）
  const pathPrefix = process.env.NEXT_PUBLIC_API_HOST ? 'api' : basePath ? `${basePath}/api` : 'api'
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_pathname, query] = asPath.split('?')
  const searchParams = new URLSearchParams(query)
  const title = searchParams.has('title') ? searchParams.get('title') : DefaultTitle
  url.pathname = `/${pathPrefix}/${encodeURIComponent(title)}.png`
  searchParams.delete('title')
  url.search = searchParams.toString()
  return url.href
}

// Only holds serverRuntimeConfig and publicRuntimeConfig
const { publicRuntimeConfig } = getConfig() as {
  publicRuntimeConfig: { basePath: string }
}
const basePath = (publicRuntimeConfig.basePath || '').replace(/^\//, '').replace(/\/$/, '')

const makeCanonical = (url: string) => {
  const { origin } = new URL(url.replace(/\/api/, ''))
  return basePath.length ? `${origin}/${basePath}` : origin
}

const description = 'generate cards for Twitter, Facebook, Slack, etc'
const title = 'Open Graph Image as a Service'
const siteName = '気合でなんとか'

const TWITTER_SITE = process.env.NEXT_PUBLIC_TWITTER_SITE || process.env.NEXT_PUBLIC_TWITTER_SITE_ID || '@Ningensei848'

export default function MyApp({ Component, pageProps }: AppProps) {
  const { basePath, asPath } = useRouter()
  const imageUrl = getOGImageUrl(basePath, asPath)
  const siteUrl = makeCanonical(imageUrl)

  // https://github.com/vercel/next.js/blob/a4159321b20148ff2f9f6fa847395a8c8162dbef/examples/with-google-tag-manager/pages/_app.js#L7-L13
  usePageView()

  return (
    <>
      <Head>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
        <title>{title}</title>
        <meta name='viewport' content='width=device-width,initial-scale=1.0' />
        <meta name='description' content={description} />
        <meta property='og:url' content={siteUrl} />
        <meta property='og:title' content={title} />
        <meta property='og:site_name' content={siteName} />
        <meta property='og:description' content={description} />
        <meta property='og:type' content='website' />
        <meta property='og:image' content={imageUrl} />
        <meta property='og:image:width' content='1200' />
        <meta property='og:image:height' content='630' />
        {/* About Twitter Cards |  https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards */}
        <meta name='twitter:card' content='summary_large_image' />
        {process.env.NEXT_PUBLIC_TWITTER_SITE ? (
          <meta name='twitter:site' content={TWITTER_SITE} />
        ) : (
          <meta name='twitter:site:id' content={TWITTER_SITE} />
        )}
        <meta name='twitter:title' content={title} />
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link rel='canonical' href={process.env.NEXT_PUBLIC_CANONICAL || siteUrl} />
        <GoogleTagManager />
        <GoogleAdsense />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
