'use server'

import { connectDB } from '#backend/DB'
import productModel from '#backend/models/productModel'
import { IProduct } from '#types/index'

export const productGetAll = async () => {
   try {
      await connectDB()

      return await productModel.find({})
   } catch (err: Error | any) {
      throw new Error(err)
   }
}

export const productGetById = async (id: string) => {
   if (!id) return
   try {
      await connectDB()

      return await productModel.findOne({ _id: id })
   } catch (err: Error | any) {
      throw new Error(err)
   }
}

export const productDeleteById = async (id: string) => {
   if (!id) return
   try {
      await connectDB()

      return await productModel.deleteOne({ _id: id })
   } catch (err: Error | any) {
      throw new Error(err)
   }
}

export const productDeleteAll = async () => {
   try {
      await connectDB()

      return await productModel.deleteMany({})
   } catch (err: Error | any) {
      throw new Error(err)
   }
}

export const productUpdateById = async (id: string, data: IProduct) => {
   if (!id || !data) return

   try {
      await connectDB()

      return await productModel.updateOne({ _id: id }, data)
   } catch (err: Error | any) {
      throw new Error(err)
   }
}

export const productCreate = async (data: IProduct) => {
   if (!data) return

   try {
      await connectDB()

      return await productModel.create(data)
   } catch (err: Error | any) {
      throw new Error(err)
   }
}

export const productGetByCategory = async (category: string) => {
   if (!category) return
   try {
      await connectDB()

      return await productModel.find({ category: category })
   } catch (err: Error | any) {
      throw new Error(err)
   }
}


