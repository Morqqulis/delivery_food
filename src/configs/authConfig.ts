import {  userGetByEmail } from '#backend/actions/userActions'
import { IUser } from '#types/index'
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import { NextAuthOptions, User } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import Google from 'next-auth/providers/google'

export const authConfig: NextAuthOptions = {
   providers: [
      Google({
         clientId: process.env.GOOGLE_CLIENT_ID!,
         clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      }),
      Credentials({
         credentials: {
            name: {
               label: 'Name',
               type: 'text',
               placeholder: 'Enter your name',
               required: true,
            },
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
            gender: {
               label: 'Gender',
               type: 'text',
               placeholder: 'Enter your gender',
               required: true,
            },
         },
         authorize: async (credentials) => {
            if (!credentials?.email || !credentials?.password) return null
            const currentUser = await userGetByEmail(credentials.email)
            // @ts-ignore
            if (!currentUser || currentUser.password !== credentials.password) return null

            return {
               ...currentUser,
            }
         },
      }),
   ],
   pages: {
      signIn: '/auth',
   },
}
