import { ImageResponse } from 'next/og'
import { parseRequest } from '@/lib/parser'

import { type NextRequest } from 'next/server'

type Params = {
    slug: string[]
}

export async function GET(request: NextRequest, context: { params: Params }) {
    const { slug } = context.params
    const searchParams = request.nextUrl.searchParams
    // cf. https://nextjs.org/docs/app/building-your-application/routing/route-handlers#url-query-parameters

    console.log(slug)
    console.log(searchParams)

    const parsedReq = parseRequest(slug, searchParams)
    console.log(parsedReq)

    return new ImageResponse(
        (
            <div
                style={{
                    fontSize: 40,
                    color: 'black',
                    background: 'white',
                    width: '100%',
                    height: '100%',
                    padding: '50px 200px',
                    textAlign: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                👋 Hello
            </div>
        ),
        {
            width: 1200,
            height: 630,
        },
    )
}
