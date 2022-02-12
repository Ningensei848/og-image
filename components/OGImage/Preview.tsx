import useSWR from 'swr'
import type { ImagePreviewProps } from 'types/og-image'

const Title = 'Click to copy image URL to clipboard'

const fetcher = (url: string) => fetch(url).then((r: Response) => r.ok && r.status === 200)

const useImagePreview = (url: string) => {
  const { data, error } = useSWR<boolean, Error>(url, fetcher, {
    refreshInterval: 2000
  })

  return {
    isLoading: !error && !data,
    isError: error
  }
}

const Loading = (): JSX.Element => {
  return <div>loading...</div>
}

const Error = (): JSX.Element => {
  return <div>failed to load</div>
}

const ImagePreview = ({ src, setToast, onClick }: ImagePreviewProps): JSX.Element => {
  const { isLoading, isError } = useImagePreview(src)

  if (isLoading) return <Loading />

  if (isError) {
    setToast({ show: true, message: 'Oops, an error occurred' })
    return <Error />
  }

  return (
    <a className='image-wrapper' href={src} onClick={onClick}>
      <img id='og-image' src={src} alt='Preview of the generated img' title={Title} />
    </a>
  )
}

export default ImagePreview
