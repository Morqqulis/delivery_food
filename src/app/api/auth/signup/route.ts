import { connectDB } from '#backend/DB'
import userModel from '#backend/models/userModel'
import { hash } from 'bcryptjs'
import { Types } from 'mongoose'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
   const { name, email, password, gender } = await request.json()

   await connectDB()

   const existingUser = await userModel.findOne({ email })

   if (existingUser) {
      return NextResponse.json({ message: 'Email artıq istifadə olunub.' }, { status: 400 })
   }

   const user = new userModel({
      name,
      email,
      password,
      gender,
   })

   await user.save()
   return NextResponse.json({ message: 'Qeydiyyat uğurla tamamlandı.' }, { status: 201 })
}
