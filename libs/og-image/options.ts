import chrome from 'chrome-aws-lambda'

const exePath =
  process.platform === 'win32'
    ? 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
    : process.platform === 'linux'
    ? '/usr/bin/google-chrome'
    : '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

interface Options {
  args: string[]
  executablePath: string
  headless: boolean
}

export async function getOptions(isDev: boolean) {
  const options: Options = {
    // args: chrome.args,  // original
    // vercel/og-image を日本語に対応させたい - chroju.dev/blog
    // cf. https://chroju.dev/blog/vercel_og_image_with_japanese
    args: isDev ? ['--lang=ja'] : Object.assign(chrome.args, ['--lang=ja']),
    executablePath: isDev ? exePath : await chrome.executablePath,
    headless: isDev ? true : chrome.headless
  }

  return options
}
