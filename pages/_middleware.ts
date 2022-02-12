import { NextResponse } from 'next/server'
import { extractTitleAndExtension } from 'libs/og-image/parser'

import type { NextRequest } from 'next/server'

const pattern_extension = /\.?(png|jpe?g)$/
const pathPrefix = (process.env.NEXT_PUBLIC_API_PREFIX || 'api').replace(/^\//, '').replace(/\/$/, '')
const pattern_apiPath = new RegExp(`/${pathPrefix || 'api'}/`, 'i') // => /\/api\//
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
  const title = searchParams.get('title')

  // extension が存在して jpe?g か png であり，かつ title パラメタがあるとき……
  if (pattern_extension.test(extension) && searchParams.has('title')) {
    // `[oldname].ext` を `[title].ext` に置き換える => title は削除
    nextUrl.pathname = pathname.replace(text, title)
    searchParams.delete('title')
    nextUrl.search = searchParams.toString()
  }
  // `/api` の配下であればスキップ
  if (pattern_apiPath.test(pathname)) return

  // extension が png/jpe?g でなければスキップ（なにもしない）
  if (!pattern_extension.test(extension)) return

  // パラメタを付け替えたうえで，basePath へリダイレクト
  if (!searchParams.has('title')) {
    searchParams.set('title', decodeURIComponent(text.replace(pattern_extension, '')))
    nextUrl.pathname = ''
  }
  searchParams.set('fileType', extension)
  nextUrl.search = searchParams.toString()

  return NextResponse.redirect(nextUrl, 308)

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
