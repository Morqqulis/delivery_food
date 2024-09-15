import { userCreate, userGetAll, userGetByEmail, userUpdateByEmail } from '#backend/actions/userActions'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
const emailShema = z.string().email()

export async function GET(req: NextRequest) {
   const params = req.nextUrl.searchParams

   const email = params.get('email')

   try {
      if (email && emailShema.safeParse(email).success) {
         const user = await userGetByEmail(email)
         if (user) {
            return NextResponse.json(user, { status: 200 })
         }

         return NextResponse.json({ error: 'User not found' }, { status: 404 })
      }

      if (!params.size && !email) {
         const users = await userGetAll()
         return NextResponse.json(users || null, { status: 200 })
      }
   } catch (error) {
      console.error('Error in GET /api/user:', error)
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
   }
}

export async function POST(req: NextRequest) {
   try {
      const { email } = await req.json()

      if (!email) {
         return NextResponse.json({ error: 'Email is required' }, { status: 400 })
      }

      if (!emailShema.safeParse(email).success) {
         return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
      }

      const user = await userGetByEmail(email)

      if (user) {
         return NextResponse.json(user, { status: 200 })
      }

      return NextResponse.json({ error: 'User not found' }, { status: 404 })
   } catch (error) {
      console.error('Error in POST /api/user:', error)
      return NextResponse.json({ error: 'Internal server error in POST /api/user' }, { status: 500 })
   }
}

export async function PUT(req: NextRequest) {
   try {
      const { email, ...rest } = await req.json()

      if (!email) {
         return NextResponse.json({ error: 'Email is required' }, { status: 400 })
      }

      if (!emailShema.safeParse(email).success) {
         return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
      }

      const dbUser = await userGetByEmail(email)

      if (dbUser) {
         const updatedUser = { email, ...rest }
         const result = await userUpdateByEmail(email, updatedUser)
         return NextResponse.json(result, {
            status: 200,
            statusText: 'User updated successfully',
         })
      } else {
         const newUser = { email, ...rest }
         await userCreate(newUser)

         return NextResponse.json({
            status: 201,
            statusText: 'User created successfully',
         })
      }
   } catch (error) {
      console.error('Error in PUT /api/user:', error)
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
   }
}
