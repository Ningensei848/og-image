import { type NextRequest, NextResponse } from 'next/server'

const pattern_extension = /\.?(png|jpe?g)$/

// _middleware.ts will run on all routes under `/pages`
export function middleware(req: NextRequest) {
  const nextUrl = req.nextUrl.clone()
  const { pathname, search } = nextUrl
  const params = new URLSearchParams(search)
  const queryString = params.toString()

  // /api/[...slug] の場合は，API Routes 側で処理
  if (/^\/api$/i.test(pathname)) {
    const title = params.has('title') ? params.get('title') : ''
    // title もなくparam もない場合（すなわち /api にアクセスされただけの場合），トップへリダイレクト
    if (!title.length && !queryString.length) {
      nextUrl.pathname = '/'
      return NextResponse.redirect(nextUrl, 308)
    }
    // 少なくともいくつかの param がある場合，それをもとに画像を生成する
    params.delete('title')
    nextUrl.pathname = `/api/${title}.png`
    nextUrl.search = params.toString() // title を更新したので再度取得し直す
    return NextResponse.redirect(nextUrl, 308)
  }
  // /api から始まらないが，①何らかのパラメタがあり②末尾に .png が含まれていた場合，
  // クエリパラメータの title を消去した上で，その filename を新たなタイトルとして，トップへリダイレクト
  if (!/^\/api/i.test(pathname) && pathname.slice(1).split('/').length === 1) {
    if (queryString.length && pattern_extension.test(pathname)) {
      params.set('title', decodeURIComponent(pathname.slice(1)).replace(pattern_extension, '')) // 上書きする
      nextUrl.pathname = '/'
      nextUrl.search = params.toString() // title を更新したので再度取得し直す
      return NextResponse.redirect(nextUrl, 308)
    }
  }
  // Finally
  return
}
