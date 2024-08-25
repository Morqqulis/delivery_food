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
         <body className={`bg-dark-400 text-light-300 h-full overflow-x-clip ${primaryFont.className}`}>
            {children}
         </body>
      </html>
   )
}
