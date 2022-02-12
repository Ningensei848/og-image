import getConfig from 'next/config'
import { getStaticMarkup } from 'components/OGImage/Template'

import type { ParsedRequest } from 'types/og-image'

const getFontData = () => {
  const { publicRuntimeConfig } = getConfig() as {
    publicRuntimeConfig: { plemolJP: string }
  }
  return publicRuntimeConfig.plemolJP
}

const getCss = (props: ParsedRequest): string => {
  const { theme, logo, title } = props
  const plemolJP = getFontData()
  const background = theme === 'dark' ? '#1b1b1b' : '#fefefa'
  const foreground = theme === 'dark' ? '#fefefa' : '#353839'
  const codeBackground = theme === 'dark' ? '#333437' : '#f5f6f7'
  const codeTextColor = theme === 'dark' ? '#19ffcc' : '#e60033'
  const radial = theme === 'dark' ? 'dimgray' : 'lightgray'

  return `
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@500&display=swap');
  @font-face {
    font-family: 'PlemolJP Console';
    font-style: normal;
    font-weight: normal;
    src: url(data:font/woff2;charset=utf-8;base64,${plemolJP}) format("woff2");
  }
  body {
    margin: 0;
    height: 100vh;
    background-color: gainsboro;
    border: solid transparent;
    border-width: 2rem 3rem;
    box-sizing: border-box;
  }
  code {
    color: ${codeTextColor};
    background-color: ${codeBackground};
    border: 0.1rem solid rgba(0, 0, 0, 0.1);
    border-radius: 0.4rem;
    font-family: 'PlemolJP Console';
    font-size: 0.85em;
    padding: 0.2em 0.4em;
    vertical-align: 0.08em;
  }
  .spacer {
    margin: 15px;
  }
  .emoji {
    height: 1em;
    width: 1em;
    margin: 0 .05em 0 .1em;
    vertical-align: -0.1em;
  }
  .heading {
    font-family: 'Noto Sans JP', sans-serif;
    font-size: 50px;
    font-style: normal;
    color: ${foreground};
    line-height: 1.67;
  }
  #ogp-container {
    height: 100%;
    display: flex;
    background: ${background};
    background-image: radial-gradient(circle at 25px 25px, ${radial} 1.25%, transparent 0%), radial-gradient(circle at 75px 75px, ${radial} 1.25%, transparent 0%);
    background-size: 100px 100px;
    box-shadow: 12px 12px 2px 1px silver;
    border-radius: .4rem;
  }
  #ogp-left {
    flex: 1 1 0;
    display: flex;
    flex-direction: column;
    justify-content: ${logo ? 'space-between' : 'end'};
    align-items: flex-start;
  }
  #logo {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 3.6rem;
  }
  #author {
    padding: 0 0 1.2rem 2rem;
    margin-right: calc(-50vw - 50vh);  /* negative margin */
    font-size: 2.2rem;
    font-weight: bolder;
  }
  #ogp-main {
    width: 630px;
    /* background-color: lightgreen; */
    display: flex;
    flex-direction: column;
    justify-content: center; /* flex-start; space-around; */
  }
  #title {
    font-size: 44px;
    margin-left: 1rem;
    word-break: keep-all;
    overflow-wrap: break-word;
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    text-align: ${title.length < 32 ? 'center' : 'start'}
  }
  #ogp-right {
    flex: 1 1 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
    text-align: end;
  }
  #timestamp {
    padding: 1.8rem 2rem 0 0;
    margin-left: calc(-50vw - 50vh);  /* negative margin */
    font-family: 'PlemolJP Console', monospace;
    font-size: 1.6rem;
    font-weight: bold;
    font-style: italic;
    color: ${radial};
  }
  #sitename {
    padding: 0 2rem 1.2rem 0;
    margin-left: calc(-50vw - 50vh);  /* negative margin */
    font-size: 2rem;
    font-weight: bolder;
  }
  `
}

// vercel/og-imageでOGP画像の自動生成 | 四十物さんは見ている
// cf. https://www.eyemono.moe/post/2021/04/30/add-og-image
export const getHtml = (parsedReq: ParsedRequest) => {
  const style = getCss(parsedReq)
  // React component を html 文字列に出力
  const markup = getStaticMarkup(style, parsedReq)
  return `<!DOCTYPE html>${markup}`
}
