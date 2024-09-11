import { userCreate, userGetAll, userGetByEmail, userGetById, userUpdateByEmail } from '#backend/actions/userActions'
import { authConfig } from '#configs/authConfig'
import { emailSchema } from '#schemes/scheme'
import { getServerSession, Session } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

export async function GET(req: NextRequest, res: NextResponse) {
   try {
      const result = await userGetAll()
      return NextResponse.json(result || 'No data')
   } catch (error) {
      console.log('Error in  api user route GET: ', error)
   }

   return NextResponse.json('No data')
}

export async function POST(req: NextRequest, res: NextResponse) {
   const { email } = await req.json()

   try {
      if (!email) return
      const user = await userGetByEmail(await email)

      return NextResponse.json(await user)
   } catch (error) {
      console.log('Error in api user route POST: ', error)

      return NextResponse.json(null, { statusText: 'No data' })
   }

   // const session = await getServerSession({
   //    req,
   //    secret: authConfig.secret,
   // })

   // return NextResponse.json(session)
   // const data = await req.json()
   // try {
   //    const result = await req.json()
   //    const user = await userGetByEmail(await result)

   //    return NextResponse.json(await user)
   // } catch (error) {
   //    console.log('Error in api user route POST: ', error)
   // }

   // return NextResponse.json(null, { statusText: 'No data' })
}

// export async function PATCH(req: NextRequest, res: NextResponse) {
//    getUserById('')
// }

// export async function DELETE(req: NextRequest, res: NextResponse) {
//    getUserById('')
// }

export async function PUT(req: NextRequest, res: NextResponse) {
   try {
      const { email, password, ...rest } = await req.json()

      const updatedUser = {
         email,
         ...rest,
      }

      const dbUser = await userGetByEmail(email)

      if (dbUser) {
         const result = await userUpdateByEmail(email, updatedUser)
         return NextResponse.json(result, {
            status: 201,
            statusText: 'User updated successfully',
         })
      } else {
         const newUser = await userCreate(updatedUser)

         return NextResponse.json(newUser, {
            status: 201,
            statusText: 'User created successfully',
         })
      }
   } catch (error) {
      console.log('Error in api user route PUT: ', error)

      return NextResponse.json(null, { statusText: 'No data' })
   }
}
