import Provider from '#providers/Provider'
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
         <body className={`h-full overflow-x-clip bg-dark-400 text-light-300 ${primaryFont.className}`}>
            <Provider>{children}</Provider>
         </body>
      </html>
   )
}
