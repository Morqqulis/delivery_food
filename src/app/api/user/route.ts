import { userGetAll, userGetByEmail, userGetById } from '#backend/actions/userActions'
import { emailSchema } from '#schemes/scheme'
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
   

   try {
      const email: z.infer<typeof emailSchema> = await req.json()
      const result = await userGetByEmail(email)
      return NextResponse.json(result)
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
