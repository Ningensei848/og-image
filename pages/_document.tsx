import Document, { Html, Head, Main, NextScript } from 'next/document'
import { GoogleTagManagerAlt } from 'components/Google'
// import Favicons from 'components/Favicons'

class MyDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head>
          <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />
          <link
            rel='stylesheet'
            href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
            crossOrigin='anonymous'
          />
          {/* <Favicons /> */}
        </Head>
        <body>
          <GoogleTagManagerAlt />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
