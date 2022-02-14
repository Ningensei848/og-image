// @ts-check

import { readFileSync } from 'fs';

// User consts ----------------------------------------------------------------
const buildId = process.env.BUILD_ID || 'build-id'
const assetPrefix = process.env.BASE_PATH ? `/${process.env.BASE_PATH}` : ''
const plemolJP = readFileSync(
    // process.cwd() is expected `/path/to/${ProjectRoot}
    `${process.cwd()}/libs/og-image/_fonts/PlemolJPConsoleHS-Text.woff2`
).toString('base64')
// ----------------------------------------------------------------------------

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    // cf. https://nextjs.org/docs/basic-features/typescript#type-checking-nextconfigjs
    reactStrictMode: true,
    swcMinify: true,
    // cf. https://nextjs.org/docs/api-reference/next.config.js/cdn-support-with-asset-prefix
    assetPrefix: process.env.CDN_URL || assetPrefix,
    // cf. https://nextjs.org/docs/api-reference/next.config.js/basepath
    basePath: process.env.BASE_PATH ? `/${process.env.BASE_PATH}` : '',
    // publicRuntimeConfig: cf. https://nextjs.org/docs/api-reference/next.config.js/runtime-configuration
    publicRuntimeConfig: {
        plemolJP,
        basePath: process.env.BASE_PATH,
        assetPrefix
    },
    // cf. https://nextjs.org/docs/messages/next-image-unconfigured-host
    // images: {
    //     domains: []
    // },
    // Explicitly specify ID || cf. https://nextjs.org/docs/api-reference/next.config.js/configuring-the-build-id
    generateBuildId: async () => {
        // You can, for example, get the latest git commit hash here
        return buildId
    }
}

export default nextConfig