import { isValidQuery } from '@/lib/validator'
import { ParsedRequest } from '@/types'

export function parseRequest(
    params: { slug: string[] },
    searchParams: URLSearchParams,
) {
    const keys = Array.from(new Set(searchParams.keys()))
    const k_v = keys.map((k) => [
        k,
        searchParams.getAll(k).length > 1
            ? searchParams.getAll(k)
            : searchParams.get(k),
    ])
    const obj = Object.fromEntries(k_v)

    const {
        theme,
        timestamp,
        tags,
        copyright,
        logo,
        avater,
        author,
        aka,
        site,
    } = obj || {}
    if (Array.isArray(theme)) {
        throw new Error('Expected a single theme')
    }
    if (
        !isValidQuery([
            theme,
            timestamp,
            copyright,
            logo,
            avater,
            author,
            aka,
            site,
        ])
    ) {
        throw new Error('Passing multiple parameters is not allowed')
    }
    const { text, extension } = extractTitleAndExtension(params)

    const parsedRequest: ParsedRequest = {
        fileType: /jpe?g/i.test(extension)
            ? (extension.replace('jpg', 'jpeg') as FileType)
            : 'png',
        theme: theme === 'dark' ? 'dark' : 'light',
        timestamp:
            (timestamp as string) ||
            new Date().toUTCString().split(/\s/).slice(2, 4).join('.'),
        title: decodeURIComponent(text),
        tags: Array.isArray(tags) ? tags : [],
        copyright: (copyright as string) || '',
        logo: (logo as string) || '',
        avater: (avater as string) || '',
        // 'http://www.entypo.com/images/info-with-circle.svg',
        author: (author as string) || '',
        aka: (aka as string) || '',
        site: (site as string) || '',
    }
    return parsedRequest
}

export const extractTitleAndExtension = (
    params: string[],
): {
    text: string
    extension: string
} => {
    const id = params.join('/')
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
        extension,
    }
}
