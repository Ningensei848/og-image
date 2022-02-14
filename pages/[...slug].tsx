import getConfig from 'next/config'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

// Only holds serverRuntimeConfig and publicRuntimeConfig
const { publicRuntimeConfig } = getConfig() as {
  publicRuntimeConfig: { basePath: string }
}

const basePath = (publicRuntimeConfig.basePath || '').replace(/^\//, '').replace(/\/$/, '')
const pathPrefix = basePath ? `${basePath}/api` : 'api'

const Redirect = () => {
  const { isReady, query, asPath, push } = useRouter()

  useEffect(() => {
    if (isReady) {
      const params = new URLSearchParams(asPath.replace(/^[^?]*/, ''))
      const slug = Array.isArray(query.slug) ? query.slug.join('/') : query.slug || ''

      console.log(`slug is ${slug}`)

      if (params.has('title')) {
        if (/^.*?api/i.test(slug)) {
          const title = params.get('title')
          params.delete('title')
          const queryString = !params.toString() ? '' : `?${params.toString()}`
          void push(`/api/${encodeURIComponent(title)}.png${queryString}`)
        }
      } else {
        const title = slug.replace(/\.?(png|jpe?g)$/, '').replace(/^.*?api$/i, '')
        if (title.length) params.set('title', decodeURIComponent(title))
      }

      const result = params.toString()

      const dist = result.length
        ? `/${pathPrefix}/${encodeURIComponent(slug.replace(/^api\//i, ''))}.png?${result}`
        : '/'

      if (/^api/.test(slug)) {
        void push(dist)
      } else {
        void push(result.length ? `/?${result}` : '/')
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady, asPath, query])

  // http://localhost:3000/test/api/?aka=okaka&title=1234567890kjhttyrsuytu
  return (
    <div
      className='loader-wrap'
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '70vh',
        background: 'lightgray'
      }}
    >
      <div className='loader' />
    </div>
  )
}

export default Redirect
