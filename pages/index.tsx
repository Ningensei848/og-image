import { isValidUrl } from 'libs/utils'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const pattern_extension = /\.?(png|jpe?g)$/

const getShortenUrl = async (url: string): Promise<string> => {
  try {
    const res = await fetch(`https://is.gd/create.php?format=json&url=${url}`)
    // const { shorturl } = (await res.json()) as { shorturl: string }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { shorturl, errorcode, errormessage } = (await res.json()) as {
      shorturl: string
      errorcode?: unknown
      errormessage?: string
    }
    if (errorcode) {
      console.warn(errormessage)
      return url
    } else {
      return shorturl
    }
  } catch (e) {
    console.warn(e)
    return url
  }
}
const getPageUrlFromSrc = async (source: string): Promise<string> => {
  if (!isValidUrl(source)) return `https://${process.env.NEXT_PUBLIC_API_HOST}`

  const url = new URL(source)
  const params = url.searchParams
  // pathname を /api で split する
  const [pathname, filename] = url.pathname.split('/api')
  url.pathname = pathname || ''
  // 得られたファイル名は，拡張子を削除したものを title としてセットする
  params.set('title', filename.replace(pattern_extension, ''))
  // params から値が無いものを取り除く
  url.searchParams.forEach((value, key) => {
    if (!value.length) params.delete(key)
  })

  // 値が `logo`, `avater` のとき，生のURLは長大になるかもしれないため，短縮する
  // "https://is.gd/create.php?format=json&url=https://example.com" に投げて res.shorturl を得る
  const logo = params.get('logo')
  const avater = params.get('avater')
  if (logo && isValidUrl(logo)) params.set('logo', await getShortenUrl(logo))
  if (avater && isValidUrl(avater)) params.set('avater', await getShortenUrl(avater))

  url.search = params.toString()
  console.log(url.href)
  const res = await getShortenUrl(url.href)
  console.log(res)

  return res
}

const NextShareButtons = dynamic(() => import('components/NextShareButtons'), {
  ssr: false
})

const OGImageGenerator = dynamic(() => import('components/OGImage'), {
  ssr: false
})

const OGImage = (): JSX.Element => {
  const [imgSrc, setImgSrc] = useState('')
  const [pageUrl, setPageUrl] = useState('')

  useEffect(() => {
    const fn = async () => setPageUrl(await getPageUrlFromSrc(imgSrc))
    // delay 後 debounce の対象の関数を実行
    const timer = setTimeout(() => void fn(), 1500)
    // 次の effect が実行される直前に timer キャンセル
    return () => clearTimeout(timer)
  }, [imgSrc])

  return (
    <div className='container'>
      <div className='wrapper'>
        <a href='https://github.com/Ningensei848/og-image' className='github-corner' aria-label='View source on GitHub'>
          <svg width='80' height='80' viewBox='0 0 250 250' className='svg'>
            <path d='M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z'></path>
            <path
              d='M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2'
              fill='currentColor'
              style={{ transformOrigin: '130px 106px' }}
              className='octo-arm'
            ></path>
            <path
              d='M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z'
              fill='currentColor'
              className='octo-body'
            ></path>
          </svg>
        </a>
        <h1>Open Graph Image as a Service</h1>

        <OGImageGenerator source={imgSrc} setSource={setImgSrc} />

        <div className='center'>
          <NextShareButtons title={'Open Graph Image as a Service'} url={pageUrl} />
          <h2>What is this?</h2>
          <p>
            This is a service that generates dynamic <a href='http://ogp.me'>Open Graph</a> images that you can embed in
            your <code>&lt;meta&gt;</code> tags.
          </p>
          <p>
            For each keystroke, headless chromium is used to render an HTML page and take a screenshot of the result
            which gets cached.
          </p>
          <p>
            Find out how this works and deploy your own image generator by visiting{' '}
            <a href='https://github.com/Ningensei848/og-image'>GitHub</a>.
          </p>
          <footer>
            Proudly hosted on <a href='https://vercel.com'>▲Vercel</a>
          </footer>
        </div>
      </div>
    </div>
  )
}

export default OGImage
