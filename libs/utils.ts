export const isValidUrl = (url: string): boolean => {
  // validation: new URL(url) で typeError が発生するか否か
  try {
    new URL(/^https?:\/\//.test(url) ? url : '')
    return true
  } catch (e) {
    // const error =
    //   e instanceof TypeError ? e : new TypeError('Error ! on isValidUrl() : invalid url.')
    // console.error(`${error.name}: ${error.message}`)
    return false
  }
}

// eslint-disable-next-line no-control-regex
const pattern_zenkaku = /[^\x01-\x7E\uFF61-\uFF9F]/
export const calcChar = (text: string): number => {
  const zenkaku = Array.from(text).filter((c) => pattern_zenkaku.test(c))
  const hankaku_length = text.length - zenkaku.length
  return zenkaku.length + hankaku_length / 2.5
}
