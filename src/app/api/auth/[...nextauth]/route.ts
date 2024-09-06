import { authConfig } from '#configs/authConfig'
import NextAuth from 'next-auth'

const handler = NextAuth({
   ...authConfig,
   secret: process.env.NEXTAUTH_SECRET,
   jwt: {
      secret: process.env.NEXTAUTH_JWT_SECRET,
   },
})

export { handler as GET, handler as POST }
