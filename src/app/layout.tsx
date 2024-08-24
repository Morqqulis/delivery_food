import { primaryFont } from '#settings/fonts'
import { homeMetadata } from '#settings/metadata'
import '#styles/index.scss'

export const metadata = homeMetadata

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode
}>) {
   return (
      <html className={`h-full`} lang="en">
         <body className={`h-full ${primaryFont.className}`}>{children}</body>
      </html>
   )
}
