import { useEffect, useState } from 'react'
import getConfig from 'next/config'

import { useQueryParam } from 'libs/og-image/parser'
import ImagePreview from 'components/OGImage/Preview'
import Toast from 'components/OGImage/parts/Toast'
import { ThemeField, FileTypeField, TextInputField } from 'components/OGImage/Field'

import type { Dispatch, SetStateAction } from 'react'

// Only holds serverRuntimeConfig and publicRuntimeConfig
const { publicRuntimeConfig } = getConfig() as {
  publicRuntimeConfig: { basePath: string }
}

interface PullLeftProps {
  setState: Dispatch<SetStateAction<string>>
}

const PullLeft = ({ setState }: PullLeftProps): JSX.Element => {
  const {
    fileType,
    setFileType,
    theme,
    setTheme,
    timestamp,
    setTimestamp,
    title,
    setTitle,
    // tags,
    // setTags,
    // copyright,
    // setCopyright,
    logo,
    setLogo,
    // avater,
    // setAvater,
    // author,
    // setAuthor,
    aka,
    setAka,
    site,
    setSite
  } = useQueryParam()

  useEffect(() => {
    const queryParams = new URLSearchParams({
      theme,
      timestamp,
      title,
      // copyright,
      logo,
      // avater,
      // author,
      aka,
      site
    })
    // for (const tag of tags) queryParams.append('tags', tag)
    const url = new URL(
      process.env.NEXT_PUBLIC_API_HOST
        ? `${window.location.protocol}//${process.env.NEXT_PUBLIC_API_HOST}`
        : window.location.origin
    )

    const basePath = (publicRuntimeConfig.basePath || '').replace(/^\//, '').replace(/\/$/, '')
    // NEXT_PUBLIC_API_HOST が指定されていれば pathPrefix は `api` （外部に API サーバがある場合）
    // そうでなければ，basePath をみて pathPrefix を決める（内部に自前で API サーバを持つ場合）
    const pathPrefix = process.env.NEXT_PUBLIC_API_HOST ? 'api' : basePath ? `${basePath}/api` : 'api'

    url.pathname = `/${pathPrefix}/${encodeURIComponent(title)}.${fileType}`
    queryParams.delete('title')
    url.search = queryParams.toString()
    console.log(`url is set ${url.href}`)
    setState(url.href)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aka, fileType, logo, site, theme, timestamp, title])

  return (
    <div className='pull-left'>
      <div>
        <ThemeField {...{ theme, setTheme, logo, setLogo }} />
        <FileTypeField {...{ fileType, setFileType }} />
        <TextInputField state={timestamp} setState={setTimestamp} label='Timestamp' />
        <TextInputField state={title} setState={setTitle} label='Title' />
        {/* <TextInputField state={tags} setState={setTags} label='Tags' /> */}
        {/* <TextInputField state={copyright} setState={setCopyright} label='Copyright' /> */}
        <TextInputField state={logo} setState={setLogo} label='Logo' type='url' />
        {/* <TextInputField state={avater} setState={setAvater} label='Avater URL' type='url' /> */}
        {/* <TextInputField state={author} setState={setAuthor} label='Author name' /> */}
        <TextInputField state={aka} setState={setAka} label='Alt name' />
        <TextInputField state={site} setState={setSite} label='Site name' />
      </div>
    </div>
  )
}

const PullRight = (props: {
  src: string
  setToast: Dispatch<
    SetStateAction<{
      show: boolean
      message: string
    }>
  >
}): JSX.Element => {
  const { src, setToast } = props
  return (
    <div className='pull-right'>
      <ImagePreview
        src={src}
        setToast={setToast}
        onClick={(e: Event) => {
          e.preventDefault()
          // クリップボードにテキストをコピーするボタンの実装 - Qiita
          // cf. https://qiita.com/flu_bit/items/659a59260446117e9548
          navigator.clipboard.writeText(src).then(
            function () {
              setToast({
                show: true,
                message: 'Copied image URL to clipboard'
              })
              setTimeout(() => setToast({ show: false, message: '' }), 3000)
              console.log('Async: Copying to clipboard was successful!')
            },
            function (err) {
              window.open(src, '_blank')
              console.error('Async: Could not copy text: ', err)
            }
          )
        }}
      />
    </div>
  )
}

interface OGImageProps {
  source: string
  setSource: Dispatch<SetStateAction<string>>
}
const OGImage = ({ source, setSource }: OGImageProps): JSX.Element => {
  const [toast, setToast] = useState({ show: false, message: '' })

  return (
    <div className='split'>
      <PullLeft setState={setSource} />
      <PullRight src={source} setToast={setToast} />
      <Toast {...toast} />
    </div>
  )
}
export default OGImage
