// cf. vercel/og-image: Open Graph Image as a Service - generate cards for Twitter, Facebook, Slack, etc
// cf. https://github.com/vercel/og-image/blob/main/api/index.ts

import Cors from 'cors'

import { getScreenshot } from 'libs/og-image/chromium'
import { parseRequest } from 'libs/og-image/parser'
import { getHtml } from 'libs/og-image/template'
import type { NextApiRequest, NextApiResponse } from 'next'

// Initializing the cors middleware
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
const cors = Cors({ methods: ['GET'] })

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn) {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    fn(req, res, (result: unknown) => {
      if (result instanceof Error) {
        return reject(result)
      }
      return resolve(result)
    })
  })
}

const isDev = !process.env.AWS_REGION
const isHtmlDebug = process.env.OG_HTML_DEBUG === '1'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Run the middleware: cf. https://nextjs.org/docs/api-routes/api-middlewares#connectexpress-middleware-support
  await runMiddleware(req, res, cors)

  const { query } = req

  try {
    const parsedReq = parseRequest(query.id as string, req)
    const html = getHtml(parsedReq)
    if (isHtmlDebug) {
      res.setHeader('Content-Type', 'text/html')
      res.end(html)
      return
    }
    const { fileType } = parsedReq
    const file = await getScreenshot(html, fileType, isDev)
    res.statusCode = 200
    res.setHeader('Content-Type', `image/${fileType.replace(/jpg$/, 'jpeg')}`)
    res.setHeader('Cache-Control', `public, immutable, no-transform, s-maxage=3600, max-age=1800`)
    res.end(file)
  } catch (e) {
    res.statusCode = 500
    res.setHeader('Content-Type', 'text/html')
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    res.end(`<h1>Internal Error</h1><p>Sorry, there was a problem</p><p>${e}</p>`)
    console.error(e)
  }
}

export default handler
