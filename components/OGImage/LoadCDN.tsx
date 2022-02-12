import type { RenderMathInElementOptions } from 'katex/dist/contrib/auto-render'

const KaTeX = ({ version }: { version: string }): JSX.Element => {
  // cf. https://katex.org/docs/autorender.html#api
  const autoRenderOption: RenderMathInElementOptions = {
    delimiters: [
      { left: '\\[', right: '\\]', display: true },
      { left: '$', right: '$', display: false }
    ]
  }
  const script_katex = `document.addEventListener("DOMContentLoaded", function() {
      renderMathInElement(document.body, ${JSON.stringify(autoRenderOption)});
    });
    `

  return (
    <>
      <link
        rel='stylesheet'
        href={`https://cdnjs.cloudflare.com/ajax/libs/KaTeX/${version}/katex.min.css`}
        integrity='sha512-g1pxMKWnqCJA5bTMwnw0Xwe0KQAfnj47+1pB0oISMqVFjm8Bg1vA3RENj+iGunE9j4zDLPWbau7jirWwJyshdQ=='
        crossOrigin='anonymous'
      />
      <script
        defer
        src={`https://cdnjs.cloudflare.com/ajax/libs/KaTeX/${version}/katex.min.js`}
        integrity='sha512-iegr9Cbvw50rG0agCU/1HUJ0w5GflT+Lsk2SRI1jOjEC15RRgJW9vMLDFxIF3mBxoIDIS41fnENNuSZD+WhIOA=='
        crossOrigin='anonymous'
      />
      <script
        defer
        src={`https://cdnjs.cloudflare.com/ajax/libs/KaTeX/${version}/contrib/auto-render.min.js`}
        integrity='sha512-ZA/RPrAo88DlwRnnoNVqKINnQNcWERzRK03PDaA4GIJiVZvGFIWQbdWCsUebMZfkWohnfngsDjXzU6PokO4jGw=='
        crossOrigin='anonymous'
        // onload={renderMathInElement(document.body)}  // => on TypeScipt this call is Error ! (not defined)
        // So we use second approach: cf. https://katex.org/docs/autorender.html#usage
      />
      <script id='Import-KaTeX-Scripts' dangerouslySetInnerHTML={{ __html: script_katex }} />
    </>
  )
}

const LoadCDN = (): JSX.Element => {
  const katex = '0.15.2'

  return (
    <>
      <KaTeX version={katex} />
    </>
  )
}

export default LoadCDN
