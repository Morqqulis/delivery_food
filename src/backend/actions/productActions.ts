'use server'

import { connectDB } from '#backend/DB'
import productModel from '#backend/models/productModel'
import sellerModel from '#backend/models/sellerModel'
import { IProduct } from '#types/index'
import { Types } from 'mongoose'

export const productGetAll = async () => {
   try {
      await connectDB()

      return await productModel.find({}).lean()
   } catch (err: Error | any) {
      throw new Error(err)
   }
}

export const productGetById = async (id: string) => {
   if (!id) return
   try {
      await connectDB()

      return await productModel.findOne({ _id: id }).populate({ path: 'sellerId', model: 'seller' }).lean()
   } catch (err: Error | any) {
      throw new Error(err)
   }
}

export const productDeleteById = async (id: string, sellerId: string) => {
   if (!id) return
   try {
      await connectDB()
      await sellerModel.updateOne(
         { _id: sellerId },
         {
            $pull: { products: new Types.ObjectId(id) },
         },
      )

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

export const productUpdateById = async (id: string, data: any) => {
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
      const product = (await productModel.create(data)).toObject()
      await sellerModel.updateOne({ _id: data.sellerId }, { $push: { products: product._id } })
      return 'Product created successfully'
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

export const productsGetByParams = async (params: any) => {
   if (!params) return
   try {
      await connectDB()

      return await productModel.find(params)
   } catch (err: Error | any) {
      throw new Error(err)
   }
}

export const productsNameQuery = async (query: string) => {
   if (!query) return
   try {
      await connectDB()
      const regex = new RegExp(query, 'i')
      const data = await productModel.find({ name: { $regex: regex } })
      console.log(data)

      return data
   } catch (err: Error | any) {
      throw new Error(err)
   }
}

export const getProductSelect = async (id: string) => {
   if (!id) return

   try {
      await connectDB()

      const product = await productModel.findById(id).select('name price').lean()
      console.log(product)
      return product
   } catch (err: any) {
      throw new Error(err.message || 'Məhsul tapılarkən xəta baş verdi.')
   }
}
