import Document, { Html, Head, Main, NextScript } from 'next/document'
import { GoogleTagManagerAlt } from 'components/Google'
// import Favicons from 'components/Favicons'

class MyDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head>
          <meta name='viewport' content='initial-scale=1, width=device-width' />
          <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap' />
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
