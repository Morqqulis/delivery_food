import { userCreate } from '#backend/actions/userActions'
import { Types } from 'mongoose'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
   const { firstName, email, password, gender } = await request.json()

   try {
      const newUser = await userCreate({ _id: new Types.ObjectId(), name: firstName, email, password, gender })

      if (!newUser) return NextResponse.json({ message: 'Email artıq istifadə olunub.' }, { status: 400 })

      return NextResponse.json({ message: 'Qeydiyyat uğurla tamamlandı.' }, { status: 201 })
   } catch (error) {
      return NextResponse.json({ message: 'Qeydiyyat ugursuz oldu.' }, { status: 400 })
   }

   // await connectDB()

   // const existingUser = await userModel.findOne({ email })

   // if (existingUser) {
   //    return NextResponse.json({ message: 'Email artıq istifadə olunub.' }, { status: 400 })
   // }

   // const user = new userModel({
   //    name,
   //    email,
   //    password,
   //    gender,
   // })

   // await user.save()
   // return NextResponse.json({ message: 'Qeydiyyat uğurla tamamlandı.' }, { status: 201 })
}
