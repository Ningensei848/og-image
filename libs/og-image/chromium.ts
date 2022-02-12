import { default as Puppeteer } from 'puppeteer-core'
import { getOptions } from 'libs/og-image/options'
import type { FileType } from 'types/og-image'

async function getPage(isDev: boolean) {
  const options = await getOptions(isDev)
  const browser = await Puppeteer.launch(options)

  return await browser.newPage()
}

export async function getScreenshot(html: string, type: FileType, isDev: boolean) {
  const page = await getPage(isDev)
  await page.setViewport({ width: 1200, height: 630 })
  // vercel/og-image を日本語に対応させたい - chroju.dev/blog
  // cf. https://chroju.dev/blog/vercel_og_image_with_japanese
  await page.setExtraHTTPHeaders({
    'Accept-Language': 'ja-JP'
  })
  // Wait until all images and fonts have loaded
  // cf. https://github.blog/2021-06-22-framework-building-open-graph-images/
  await page.setContent(html, { waitUntil: 'domcontentloaded' })
  await page.evaluate(async () => {
    const selectors = Array.from(document.querySelectorAll('img'))
    await Promise.all([
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      document.fonts.ready,
      ...selectors.map((img) => {
        // Image has already finished loading, let’s see if it worked
        if (img.complete) {
          // Image loaded and has presence
          if (img.naturalHeight !== 0) return
          // Image failed, so it has no height
          throw new Error('Image failed to load')
        }
        // Image hasn’t loaded yet, added an event listener to know when it does
        return new Promise((resolve, reject) => {
          img.addEventListener('load', resolve)
          img.addEventListener('error', reject)
        })
      })
    ])
  })

  const file = await page.screenshot({ type })
  return file
}
