import { NextResponse } from 'next/server'
import { extractTitleAndExtension } from 'libs/og-image/parser'

import type { NextRequest } from 'next/server'

const pattern_extension = /\.?(png|jpe?g)$/
const pathPrefix = (process.env.NEXT_PUBLIC_API_PREFIX || 'api').replace(/^\//, '').replace(/\/$/, '')
const pattern_apiPath = new RegExp(pathPrefix, 'i')
/*
next/server | Next.js
cf. https://nextjs.org/docs/api-reference/next/server
*/
export function middleware(req: NextRequest) {
  // create an instance of the class to access the public methods. This uses `next()`,
  // you could use `redirect()` or `rewrite()` as well
  // let res = NextResponse.redirect('/')
  const { nextUrl } = req
  const { basePath, pathname, searchParams } = nextUrl
  const { text, extension } = extractTitleAndExtension(pathname.replace(`/${basePath}`, ''))

  // /api/*
  if (pattern_apiPath.test(pathname)) {
    // title が存在していれば，pathname をそれで置き換えて，title を消す
    if (searchParams.has('title')) {
      const title = searchParams.get('title')
      const temp = pathname.replace(pattern_apiPath, '')
      console.log(`temp is ${temp}`)
      const hoge = pattern_extension.test(temp) ? pathname.replace(text, title) : `/${title}.png`
      console.log(`pathname is ${pathname}`)
      console.log(`hoge is ${hoge}`)
      nextUrl.pathname = decodeURIComponent(pathPrefix + hoge)
      console.log('nextUrl is', nextUrl.pathname)
      searchParams.delete('title')
      searchParams.set('fileType', extension || 'png')
      nextUrl.search = searchParams.toString()
      return NextResponse.redirect(nextUrl, 308)
    } else {
      // png, jpeg であればスキップ => 画像を生成して返す
      if (pattern_extension.test(pathname)) return
      // でなければ，編集画面へ遷移
      nextUrl.search = searchParams.toString()
      nextUrl.pathname = '/'
      return NextResponse.redirect(nextUrl, 308)
    }
  } else {
    // pathname が存在していれば，title があるか確認する
    // title があれば，なにもしない
    // title がなければ，pathname をtitle にする
    // pathname を消す
    if (pathname.length && pathname !== '/') {
      if (!searchParams.has('title')) {
        const title = pathname.replace(pattern_extension, '').replace(/^\//, '')
        searchParams.set('title', decodeURIComponent(title))
      }
      nextUrl.pathname = ''
      searchParams.set('fileType', extension || 'png')
      nextUrl.search = searchParams.toString()
      console.log(nextUrl.href)
      return NextResponse.redirect(nextUrl, 308)
    }

    // Finally
    return

    // for debug
    // return new Response(`
    //   basePath is ${basePath} \n
    //   pathname is ${pathname} \n
    //   title is ${decodeURIComponent(text.replace(pattern_extension, ''))} \n
    //   search is ${searchParams.toString()} \n
    //   text is ${text} \n
    //   origin is ${nextUrl.origin} \n
    //   nextUrl is ${nextUrl.href}
    // `)
  }
}
