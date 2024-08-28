'use server'
import { connectDB } from '#backend/DB'
import sellerModel from '#backend/models/sellerModel'
import { ISeller } from '#types/index'

export const sellerCreate = async (data: ISeller) => {
   if (!data) return

   try {
      await connectDB()
      await sellerModel.create(data)
      return 'Seller created successfully'
   } catch (err: Error | any) {
      throw new Error(err)
   }
}

export const sellerGetAll = async () => {
   try {
      await connectDB()
      return await sellerModel.find()
   } catch (err: Error | any) {
      throw new Error(err)
   }
}

export const sellerGetById = async (id: string, select: string) => {
   if (!id) return
   try {
      await connectDB()
      return await sellerModel.findOne({ _id: id }).populate('products', select).lean()
   } catch (err: Error | any) {
      throw new Error(err)
   }
}

export const sellerDelete = async (id: string) => {
   if (!id) return
   try {
      await connectDB()
      return await sellerModel.deleteOne({ _id: id })
   } catch (err: Error | any) {
      throw new Error(err)
   }
}

export const sellerUpdate = async (id: string, data: any) => {
   if (!id) return

   try {
      await connectDB()
      await sellerModel.updateOne({ _id: id }, data).lean()
      return 'Updated successfully'
   } catch (err: Error | any) {
      throw new Error(err)
   }
}
