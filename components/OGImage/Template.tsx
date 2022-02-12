/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @next/next/no-head-element */

import { renderToStaticMarkup } from 'react-dom/server'
import { marked } from 'marked'
import { parse as twemojiParse } from 'twemoji'
import { loadDefaultJapaneseParser } from 'budoux'

import LoadCDN from 'components/OGImage/LoadCDN'

import type { ParsedRequest } from 'types/og-image'

export const getStaticMarkup = (style: string, parsedReq: ParsedRequest) => {
  return renderToStaticMarkup(<HTML style={style} props={parsedReq} />)
}

const HTML = ({ props, style }: { props: ParsedRequest; style: string }): JSX.Element => (
  <html lang='ja'>
    <head>
      <meta charSet='utf-8' />
      <title>Generated Image</title>
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <style dangerouslySetInnerHTML={{ __html: style }} />
      <LoadCDN />
    </head>
    <Body {...props} />
  </html>
)

const Body = (props: ParsedRequest): JSX.Element => {
  // const { timestamp, title, tags, copyright, logo, avater, author, aka, site } = props
  const { timestamp, title, logo, aka, site } = props

  return (
    <body>
      <div id='ogp-container'>
        <div id='ogp-left'>
          <div id='logo'>
            {logo ? <img alt='Generated' src={new URL(logo).toString()} width='auto' height='80' /> : ''}
          </div>
          <div id='author' className='heading'>
            {/* TODO: avater, author とのレイアウト */}
            {aka || ''}
          </div>
        </div>
        <div id='ogp-main'>
          <Title text={marked.parseInline(title)} />
          <div className='spacer' />
          {/* <Tag items={tags} /> */}
          {/* <CopyRights /> */}
        </div>
        <div id='ogp-right'>
          <div id='timestamp'>{timestamp || ''}</div>
          <div id='sitename' className='heading'>
            {site || ''}
          </div>
        </div>
      </div>
    </body>
  )
}

const twOptions = { folder: 'svg', ext: '.svg' }
const budoux = loadDefaultJapaneseParser()
const Title = ({ text }: { text: string }): JSX.Element => (
  <div
    id='title'
    className='heading'
    dangerouslySetInnerHTML={{
      __html: twemojiParse(budoux.parse(text, 500).join('<wbr>'), twOptions)
    }}
  />
)
