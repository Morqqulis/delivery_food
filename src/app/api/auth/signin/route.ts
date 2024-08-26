import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '#backend/DB'
import userModel from '#backend/models/userModel'
import { compare } from 'bcryptjs'

export async function POST(request: NextRequest) {
   try {
      const { email, password } = await request.json()

      await connectDB()

      const existingUser = await userModel.findOne({ email })

      if (existingUser) {
         const isValid = await compare(password, existingUser.password)
         if (isValid) {
            return NextResponse.json({ message: 'Login successful' }, { status: 200 })
         } else {
            return NextResponse.json({ message: 'Parol yanlısdır' }, { status: 401 })
         }
      } else {
         return NextResponse.json({ message: 'Email və ya parol yanlısdır' }, { status: 401 })
      }
   } catch (error) {
      return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
   }
}
