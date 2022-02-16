import { useEffect, useState } from 'react'

// cf. https://github.com/Bunlong/next-share
import {
  TwitterShareButton,
  TwitterIcon,
  LineShareButton,
  LineIcon,
  FacebookShareButton,
  FacebookIcon,
  WeiboShareButton,
  WeiboIcon,
  PocketShareButton,
  PocketIcon,
  HatenaShareButton,
  HatenaIcon,
  RedditShareButton,
  RedditIcon,
  TelegramShareButton,
  TelegramIcon
} from 'next-share'

import styles from 'styles/NextShareButtons.module.css'
import { HashTag } from 'consts/social'

interface CommonProps {
  url: string
  title: string
}

const IconProps = {
  size: 32,
  round: true
}

const Facebook = (props: CommonProps): JSX.Element => (
  <FacebookShareButton {...props} quote={props.title} hashtag={HashTag}>
    <FacebookIcon {...IconProps} />
  </FacebookShareButton>
)

const Twitter = (props: CommonProps): JSX.Element => (
  <TwitterShareButton {...props} hashtags={[HashTag]}>
    <TwitterIcon {...IconProps} />
  </TwitterShareButton>
)

const Line = (props: CommonProps): JSX.Element => (
  <LineShareButton {...props}>
    <LineIcon {...IconProps} />
  </LineShareButton>
)

const Weibo = (props: CommonProps): JSX.Element => (
  <WeiboShareButton {...props}>
    <WeiboIcon {...IconProps} />
  </WeiboShareButton>
)

const Pocket = (props: CommonProps): JSX.Element => (
  <PocketShareButton {...props}>
    <PocketIcon {...IconProps} />
  </PocketShareButton>
)

const Hatena = (props: CommonProps): JSX.Element => (
  <HatenaShareButton {...props}>
    <HatenaIcon {...IconProps} />
  </HatenaShareButton>
)

const Reddit = (props: CommonProps): JSX.Element => (
  <RedditShareButton {...props}>
    <RedditIcon {...IconProps} />
  </RedditShareButton>
)

const Telegram = (props: CommonProps): JSX.Element => (
  <TelegramShareButton {...props}>
    <TelegramIcon {...IconProps} />
  </TelegramShareButton>
)

interface NextShareProps {
  title?: string
  url?: string
}

const NextShareButtons = (props: NextShareProps): JSX.Element => {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const { origin, pathname } = window.location
    const title = props.title || document.title
    const url = props.url || `${origin}${pathname}`
    setTitle(title)
    setUrl(url)
  })

  const common = { url, title }

  return (
    <div className={styles.SocialButtons}>
      <Facebook {...common} />
      <Twitter {...common} />
      <Line {...common} />
      <Weibo {...common} />
      <Pocket {...common} />
      <Hatena {...common} />
      <Reddit {...common} />
      <Telegram {...common} />
    </div>
  )
}

export default NextShareButtons
