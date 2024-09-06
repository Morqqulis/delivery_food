import { userGetAll, userGetByEmail, userGetById } from '#backend/actions/userActions'
import { emailSchema } from '#schemes/scheme'
import { Session } from 'next-auth'
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
   const { data } = await req.json()
   console.log(await data?.user?.email)
   try {
      const serializedSession = JSON.parse(JSON.stringify(data))
      // const email: z.infer<typeof emailSchema> = await result.data?.user?.email

      // const result = await userGetByEmail(email)

      // console.log(result)

      // if (!result) return NextResponse.json('User not found')

      return NextResponse.json(serializedSession)
   } catch (error) {
      console.log('Error in api user route POST: ', error)
   }

   return NextResponse.json('User not found')
}

// export async function PATCH(req: NextRequest, res: NextResponse) {
//    getUserById('')
// }

// export async function DELETE(req: NextRequest, res: NextResponse) {
//    getUserById('')
// }
