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
