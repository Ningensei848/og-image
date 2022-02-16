import getConfig from 'next/config'


export const getRuntimeConfig = <T>(): T => {
    // Only holds serverRuntimeConfig and publicRuntimeConfig
    const { publicRuntimeConfig } = getConfig() as { publicRuntimeConfig: T }
    return publicRuntimeConfig
}

export const Description =
    'Generate images dynamically by specifying query parameters. These are used as cards when shared on Twitter, Facebook, Slack, etc.'
export const SITE_NAME = '気合でなんとか'
export const Title = `Open Graph Image as a Service | ${SITE_NAME}`

export const DefaultTitle =
    'This `App` supports not only **Markdown**, _but also_<br />**Emoji** 🎉🎊🍾🥳 _and_<br /> $\\KaTeX$'

export const pattern_extension = /\.?(png|jpe?g)$/

