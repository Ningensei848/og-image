import { useRouter } from 'next/router'
import { useEffect } from 'react'

// cf. https://dev.classmethod.jp/articles/typings-of-window-object/#toc-11
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dataLayer: Record<string, any>[]
  }
}

const pageview = (url: string) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  window.dataLayer.push({
    event: 'pageview',
    page: url
  })
}

export const usePageView = () => {
  const router = useRouter()
  useEffect(() => {
    router.events.on('routeChangeComplete', pageview)
    return () => {
      router.events.off('routeChangeComplete', pageview)
    }
  }, [router.events])
}
