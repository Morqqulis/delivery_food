import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/** @type {import('next').NextConfig} */
const nextConfig = {
   reactStrictMode: false,
   images: {
      remotePatterns: [
         {
            protocol: 'https',
            hostname: '**',
         },
      ],
   },

   sassOptions: {
      includePaths: [path.join(__dirname, './src/styles')],
      prependData: `@import "av";`,
   },
   experimental: {
      reactCompiler: true,
      // typedRoutes: true,
      ppr: true,
      cssChunking: 'loose',
      turbo: {
         resolveExtensions: ['.mdx', '.tsx', '.ts', '.jsx', '.js', '.mjs', '.json', '.css', '.scss'],
      },
   },
}

export default nextConfig
