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
      const sellers = await sellerModel.find()
      return JSON.parse(JSON.stringify(sellers))
   } catch (err: Error | any) {
      throw new Error(err)
   }
}
export const sellerGetById = async (id: string) => {
   if (!id) return
   try {
      await connectDB()
      const seller = await sellerModel.findOne({ _id: id })
      return JSON.parse(JSON.stringify(seller))
   } catch (err: Error | any) {
      throw new Error(err)
   }
}
export const sellerGetByIdWithPopulate = async (id: string) => {
   if (!id) return
   try {
      await connectDB()
      const seller = await sellerModel.findOne({ _id: id }).populate('products')
      return JSON.parse(JSON.stringify(seller))
   } catch (err: Error | any) {
      throw new Error(err)
   }
}
export const sellerGetProductsWithSelect = async (id: string, select: string) => {
   if (!id) return
   try {
      await connectDB()
      const products = await sellerModel.findOne({ _id: id }, 'products').populate('products', select)
      return JSON.parse(JSON.stringify(products))
   } catch (err: Error | any) {
      throw new Error(err)
   }
}

export const sellerDelete = async (id: string) => {
   if (!id) return
   try {
      await connectDB()
      await sellerModel.deleteOne({ _id: id })
      return 'Deleted successfully'
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
