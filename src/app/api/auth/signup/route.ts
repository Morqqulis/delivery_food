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

   //  const hashedPassword = await hash(password, 12);

   const user = new userModel({
      _id: new Types.ObjectId(),
      name,
      email,
      password,
      gender,
      basket: [{
         productId: 'salam',
         quantity: 4,
      }],
   })

   await user.save()

   //  await userModel.create({
   //     _id: new Types.ObjectId(),
   //     name,
   //     email,
   //     password,
   //     basket: [
   //        {
   //           productId: 'salam',
   //           quantity: 4,
   //        },
   //     ],
   //     gender,
   //  })
   return NextResponse.json({ message: 'Qeydiyyat uğurla tamamlandı.' }, { status: 201 })
}
