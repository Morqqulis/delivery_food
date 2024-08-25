'use server'

import { connectDB } from '#backend/DB'
import userModel from '#backend/models/userModel'
export const userGetAll = async () => {
   try {
      await connectDB()

      return await userModel.find()
   } catch (err: Error | any) {
      throw new Error(err)
   }
}

export const userGetById = async (id: string) => {
   if (!id) return
   try {
      await connectDB()

      return await userModel.findOne({ _id: id })
   } catch (err: Error | any) {
      throw new Error(err)
   }
}

export const userDeleteById = async (id: string) => {
   if (!id) return
   try {
      await connectDB()

      return await userModel.deleteOne({ _id: id })
   } catch (err: Error | any) {
      throw new Error(err)
   }
}

export const userUpdateById = async (id: string, data: any) => {
   if (!id || !data) return

   try {
      await connectDB()

      return await userModel.updateOne({ _id: id }, data)
   } catch (err: Error | any) {
      throw new Error(err)
   }
}

export const userCreate = async (data: any) => {
   if (!data) return

   try {
      await connectDB()

      return await userModel.create(data)
   } catch (err: Error | any) {
      throw new Error(err)
   }
}
