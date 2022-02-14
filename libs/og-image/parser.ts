import { useState } from 'react'
import { useRouter } from 'next/router'
import { parse as parseQueryString } from 'query-string'

import type { NextApiRequest } from 'next'
import type { FileType, ParsedRequest, Theme } from 'types/og-image'

const isValidQuery = (args: Array<string | string[]>): boolean => {
  for (const param of args) {
    if (Array.isArray(param)) {
      throw new Error('Expected a single parameter, not multiple')
    }
  }
  return true
}

export const extractTitleAndExtension = (
  id: string
): {
  text: string
  extension: string
} => {
  const arr = (id || '/').split('.')
  // Caution: Don't move or remove this line. Array.pop() is NOT Immutable !
  const extension = arr.length > 1 ? arr.pop() : ''
  let text = ''

  if (arr.length === 0) {
    text = ''
  } else if (arr.length === 1) {
    text = arr[0]
  } else {
    text = arr.join('.')
  }

  return {
    text,
    extension
  }
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

  const { text, extension } = extractTitleAndExtension(id)

  const parsedRequest: ParsedRequest = {
    fileType: /jpe?g/i.test(extension) ? (extension.replace('jpg', 'jpeg') as FileType) : 'png',
    theme: theme === 'dark' ? 'dark' : 'light',
    timestamp: (timestamp as string) || new Date().toUTCString().split(/\s/).slice(2, 4).join('.'),
    title: decodeURIComponent(text),
    tags: Array.isArray(tags) ? tags : [],
    copyright: (copyright as string) || '',
    logo: (logo as string) || '',
    avater: (avater as string) || '',
    // 'http://www.entypo.com/images/info-with-circle.svg',
    author: (author as string) || '',
    aka: (aka as string) || '',
    site: (site as string) || ''
  }
  return parsedRequest
}

export const useQueryParam = () => {
  const { asPath } = useRouter()

  const searchParams = new URLSearchParams(asPath.replace(/^.*?\?/, ''))
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const query = parseQueryString(searchParams.toString() || '') as { [key: string]: string | string[] }

  const [fileType, setFileType] = useState<FileType>((query.fileType as string as FileType) || 'png')
  const [theme, setTheme] = useState<Theme>((query.theme as string as Theme) || 'light')
  const [timestamp, setTimestamp] = useState<string>(
    (query.timestamp as string) || new Date().toUTCString().split(/\s/).slice(2, 4).join('.')
  )
  const [title, setTitle] = useState<string>((query.title as string) || '**Hello** World')
  const [tags, setTags] = useState<Array<string>>((query.tags as string[]) || [])
  const [copyright, setCopyright] = useState<string>((query.copyright as string) || '')
  const [logo, setLogo] = useState<string>(
    (query.logo as string) || `https://assets.vercel.com/image/upload/front/assets/design/vercel-triangle-${theme === 'light' ? 'black' : 'white'}.svg`
  )
  const [avater, setAvater] = useState<string>((query.avater as string) || '')
  const [author, setAuthor] = useState<string>((query.author as string) || '')
  const [aka, setAka] = useState<string>((query.aka as string) || '')
  const [site, setSite] = useState<string>((query.site as string) || '')

  return {
    fileType,
    setFileType,
    theme,
    setTheme,
    timestamp,
    setTimestamp,
    title,
    setTitle,
    tags,
    setTags,
    copyright,
    setCopyright,
    logo,
    setLogo,
    avater,
    setAvater,
    author,
    setAuthor,
    aka,
    setAka,
    site,
    setSite
  }
}
