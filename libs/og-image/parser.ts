import type { NextApiRequest } from 'next'
import type { FileType, ParsedRequest } from 'types/og-image'

const isValidQuery = (args: Array<string | string[]>): boolean => {
  for (const param of args) {
    if (Array.isArray(param)) {
      throw new Error('Expected a single parameter, not multiple')
    }
  }
  return true
}

export function parseRequest(id: string, req: NextApiRequest) {
  console.log('HTTP ' + req.url)
  const { query } = req
  const { theme, timestamp, tags, copyright, logo, avater, author, aka, site } = query || {}

  if (Array.isArray(theme)) {
    throw new Error('Expected a single theme')
  }
  if (!isValidQuery([theme, timestamp, copyright, logo, avater, author, aka, site])) {
    throw new Error('Passing multiple parameters is not allowed')
  }

  const arr = (id || '/').split('.')
  const extension = arr.length > 1 ? arr.pop() : ''
  let text = ''

  if (arr.length === 0) {
    text = ''
  } else if (arr.length === 1) {
    text = arr[0]
  } else {
    text = arr.join('.')
  }

  const parsedRequest: ParsedRequest = {
    fileType: /jpe?g/i.test(extension) ? (extension.replace('jpg', 'jpeg') as FileType) : 'png',
    theme: theme === 'dark' ? 'dark' : 'light',
    timestamp: (timestamp as string) || new Date().toUTCString().split(/\s/).slice(2, 4).join('.'),
    title: decodeURIComponent(text),
    tags: Array.isArray(tags) ? tags : [],
    copyright: (copyright as string) || '',
    logo: (logo as string) || '',
    avater: (avater as string) || 'http://www.entypo.com/images/info-with-circle.svg',
    author: (author as string) || '',
    aka: (aka as string) || '',
    site: (site as string) || ''
  }
  return parsedRequest
}
