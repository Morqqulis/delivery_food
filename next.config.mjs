import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/** @type {import('next').NextConfig} */
const nextConfig = {
   reactStrictMode: false,
   compress: true,
   optimizeFonts: true,
   // need ip 0.0.0.0 for mongo db
   // rewrites: async () => {
   //    return [
   //       {
   //          source: '/api/:path*',
   //          destination: 'http://0.0.0.0:3000/api/:path*',
   //       },
   //       {
   //          source: '/:path*',
   //          destination: 'http://0.0.0.0:3000/:path*',
   //       },
   //       {
   //          source: '/:path*',
   //          destination: 'http://localhost:3000/:path*',
   //       },
   //    ]
   // },
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
      optimizePackageImports: [
         'bcryptjs',
         'next-auth',
         'clsx',
         'class-variance-authority',
         'cookie',
         'mongodb',
         'mongoose',
         'react-hook-form',
         'zod',
         'formidable',
         'gridfs-stream',
         'lucide-react',
      ],
      ppr: true,
      cssChunking: 'loose',
      turbo: {
         resolveExtensions: ['.mdx', '.tsx', '.ts', '.jsx', '.js', '.mjs', '.json', '.css', '.scss'],
      },
   },
}

export default nextConfig
