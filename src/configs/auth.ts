import { userGetAll } from '#backend/actions/userActions'
import { NextAuthOptions, User } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'
import bcryptjs from 'bcryptjs'
export const authConfig: NextAuthOptions = {
   providers: [
      Google({
         clientId: process.env.GOOGLE_CLIENT_ID!,
         clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      }),
      Credentials({
         credentials: {
            email: {
               label: 'Email',
               type: 'email',
               placeholder: 'Enter your email',
               required: true,
            },
            password: {
               label: 'Password',
               type: 'password',
               placeholder: 'Enter your password',
               required: true,
            },
         },
         authorize: async (credentials) => {
            if (!credentials?.email || !credentials?.password) return null

            const users = await userGetAll()

            const currentUser = users.find((user) => user.email === credentials.email)

            if (!currentUser || currentUser.password !== credentials.password) {
               return null
            }

            

            return {
               id: currentUser._id,
               name: currentUser.name,
               email: currentUser.email,
               image: currentUser.image,
               gender: currentUser.gender,
               
            } as User
         },
      }),
   ],
}
