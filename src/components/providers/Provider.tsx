import { PropsWithChildren } from 'react'
import { NextAuthProvider } from './NextAuthProvider'

const Provider: React.FC<PropsWithChildren> = ({ children }: PropsWithChildren): JSX.Element => {
   return (
      <>
         <NextAuthProvider>{children}</NextAuthProvider>
      </>
   )
}

export default Provider
