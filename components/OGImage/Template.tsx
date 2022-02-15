/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @next/next/no-head-element */

import { Fragment } from 'react'
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
      <link rel='preconnect' href='https://fonts.gstatic.com' />
      <style dangerouslySetInnerHTML={{ __html: style }} />
      <LoadCDN />
    </head>
    <Body {...props} />
  </html>
)

const Invisible = (): JSX.Element => (
  <span style={{ opacity: 0 }}>This text is invisible (as placeholder to avoid breaking the layout)</span>
)

interface AuthorProps {
  avater: string
  author: string
  aka: string
}
const Author = ({ avater, author, aka }: Partial<AuthorProps>): JSX.Element => (
  <div id='profile' className='heading'>
    {/* TODO: avater, author とのレイアウト */}
    {(!avater && !author) || (
      <div id='display'>
        {avater && <img id='avater' src={avater} alt='icon' />}
        {author && <span id='author-name'>{author}</span>}
      </div>
    )}
    {aka && <span id='aka'>{aka}</span>}
  </div>
)

const Tag = ({ items }: { items: string[] }): JSX.Element => {
  if (!items.length) {
    return <></>
  } else {
    return (
      <div id='tags'>
        {items.map((item, idx) => (
          <Fragment key={idx}>
            <span className='tag'>#{item}</span>
            <wbr />
          </Fragment>
        ))}
      </div>
    )
  }
}

const CopyRight = ({ text }: { text: string }) => (
  <div id='copyright'>
    © {text} {new Date().getFullYear()}.
  </div>
)

const Body = (props: ParsedRequest): JSX.Element => {
  const { timestamp, title, tags, copyright, logo, avater, author, aka, site } = props
  // const { timestamp, title, logo, site } = props

  return (
    <body>
      <div id='ogp-container'>
        <div id='ogp-left'>
          <div id='logo'>
            {logo ? <img alt='Generated' src={new URL(logo).toString()} width='auto' height='80' /> : <Invisible />}
          </div>
          <Author {...{ avater, author, aka }} />
          {/* <Author
            {...{
              avater: 'https://pbs.twimg.com/profile_images/763543133724352513/r6RlBYDo_400x400.jpg',
              aka: '@Ningensei848',
              author: 'ありがとう上木敬🌤️'
            }}
          /> */}
        </div>
        <div id='ogp-main'>
          <div id='main-content'>
            <Title text={marked.parseInline(title)} />
            <Tag items={tags} />
          </div>
          <CopyRight text={copyright} />
        </div>
        <div id='ogp-right'>
          <div id='timestamp'>{timestamp || <Invisible />}</div>
          <div id='sitename' className='heading'>
            {site || <Invisible />}
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
