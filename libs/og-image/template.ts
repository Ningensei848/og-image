import { getRuntimeConfig } from 'consts/global'
import { calcChar } from 'libs/utils'
import { getStaticMarkup } from 'components/OGImage/Template'

import type { ParsedRequest } from 'types/og-image'

const getCss = (props: ParsedRequest): string => {
  const { theme, logo, title } = props

  const background = theme === 'dark' ? '#1b1b1b' : '#fefefa'
  const foreground = theme === 'dark' ? '#fefefa' : '#353839'
  const codeBackground = theme === 'dark' ? '#333437' : '#f5f6f7'
  const codeTextColor = theme === 'dark' ? '#19ffcc' : '#e60033'
  const radial = theme === 'dark' ? 'dimgray' : 'lightgray'
  const subText = theme === 'dark' ? 'lightgray' : 'dimgray'

  const correctedLength = calcChar(title)
  const marginScale = correctedLength > 32 ? 4.8 : 18 - 13.2 * (correctedLength / 32) // 9 - 4.8

  const { plemolJP: PlemolJP } = getRuntimeConfig<{ plemolJP: string }>()

  return `
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;500&display=swap');
  @font-face {
    font-family: 'PlemolJP Console';
    font-style: normal;
    font-weight: normal;
    src: url(data:font/woff2;charset=utf-8;base64,${PlemolJP}) format("woff2");
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
  #profile {
    padding: 0 0 1.25rem 2rem;
    margin-right: calc(-50vw - 50vh);  /* negative margin */
    font-size: 2.2rem;
    font-weight: bolder;
    display: flex;
    flex-direction: column;
  }
  #display {
    display: inline-flex;
    max-height: 4.2rem;
    align-items: center;
  }
  #avater {
    width: 3.2rem;
    height: 3.2rem;
    object-fit: cover;
    border-radius: 9999px;
    margin-right: .75rem;
  }
  #author-name {
    font-size: 2rem;
  }
  #aka {
    font-size: 1.8rem;
    color: ${subText};
    margin-left: .25rem;
  }
  #ogp-main {
    width: 630px;
    /*
    background-color: lightgreen;
    opacity: 0.5;
    */
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  #title {
    font-size: 44px;
    /* margin: ${title.length < 24 ? '9rem' : '4rem'} 1rem 0 2rem; */
    margin: ${marginScale}rem 1rem 0 2rem;
    word-break: keep-all;
    overflow-wrap: break-word;
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    text-align: ${title.length < 24 ? 'center' : 'start'};
  }
  #tags {
    margin: 0.5rem  0 0 2rem;
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-align: ${title.length < 24 ? 'center' : 'start'};
  }
  .tag {
    color: ${subText};
    font-family: 'Noto Sans JP', sans-serif;
    font-size: 1.4rem;
    font-weight: lighter;
    margin-right: 0.5rem;
  }
  #copyright {
    font-family: 'Noto Sans JP', sans-serif;
    font-weight: lighter;
    color: ${subText};
    opacity: 0.5;
    margin-bottom: .5rem;
    text-align: center;
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
    padding: 0 2rem 1.6rem 0;
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
