import { PropsWithChildren } from 'react'
import { NextAuthProvider } from './NextAuthProvider'
import { Toaster } from '#ui/toaster'

const Provider: React.FC<PropsWithChildren> = ({ children }: PropsWithChildren): JSX.Element => {
   return (
      <>
         <NextAuthProvider>{children}</NextAuthProvider>
         <Toaster />
      </>
   )
}

export default Provider
