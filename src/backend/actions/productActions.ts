'use server'

import { connectDB } from '#backend/DB'
import productModel from '#backend/models/productModel'
import sellerModel from '#backend/models/sellerModel'
import { IBasket, IProduct } from '#types/index'
import { Types } from 'mongoose'

export const productGetAll = async () => {
   try {
      await connectDB()
      const products = await productModel.find()
      return products
   } catch (err: Error | any) {
      throw new Error(err)
   }
}
export const productGetAllPopulate = async () => {
   try {
      await connectDB()
      const products = await productModel.find().populate({ path: 'seller', model: 'seller' })
      return JSON.parse(JSON.stringify(products))
   } catch (err: Error | any) {
      throw new Error(err)
   }
}
export const productGetAllWithPopulateBySelect = async (select: string) => {
   try {
      await connectDB()
      const products = await productModel.find().populate({ path: 'seller', model: 'seller', select })
      return JSON.parse(JSON.stringify(products))
   } catch (err: Error | any) {
      throw new Error(err)
   }
}

export const productGetById = async (id: string, select?: string) => {
   if (!id) return
   try {
      await connectDB()
      const product = await productModel.findOne({ _id: id }, select)
      return JSON.parse(JSON.stringify(product))
   } catch (err: Error | any) {
      throw new Error(err)
   }
}
export const productGetByIdWithPopulate = async (id: string, selectProduct: string, selectSeller: string) => {
   if (!id) return
   try {
      await connectDB()
      const product = await productModel
         .findOne({ _id: id }, selectProduct)
         .populate({ path: 'sellerId', model: 'seller', select: selectSeller })
      return JSON.parse(JSON.stringify(product))
   } catch (err: Error | any) {
      throw new Error(err)
   }
}
type BasketItem = {
   product: string
   quantity: number
}
export const productsGetByIds = async (params: BasketItem[]) => {
   try {
      const productIds = params.map((product) => product.product)
      const products = await productModel.find({ _id: { $in: productIds } })
      const result = products.map((product) => {
         const item = params.find((item) => item.product === product._id.toString())
         return {
            ...product.toObject(),
            quantity: item?.quantity || 1,
         }
      })
      return JSON.parse(JSON.stringify(result))
   } catch (err) {
      console.error('Məhsulları əldə etmək zamanı xəta baş verdi:', err)
      throw err
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
      await productModel.deleteOne({ _id: id })
      return 'Product deleted successfully'
   } catch (err: Error | any) {
      throw new Error(err)
   }
}

export const productDeleteAll = async () => {
   try {
      await connectDB()
      await productModel.deleteMany({})
      return 'All products deleted successfully'
   } catch (err: Error | any) {
      throw new Error(err)
   }
}

export const productUpdateById = async (id: string, data: any) => {
   if (!id || !data) return

   try {
      await connectDB()
      await productModel.updateOne({ _id: id }, data)
      return 'Product updated successfully'
   } catch (err: Error | any) {
      throw new Error(err)
   }
}

export const productCreate = async (data: IProduct) => {
   if (!data) return

   try {
      await connectDB()
      const product = (await productModel.create(data)).toObject()
      await sellerModel.updateOne({ _id: data.seller }, { $push: { products: product._id } })
      return 'Product created successfully'
   } catch (err: Error | any) {
      throw new Error(err)
   }
}

export const productsGetByCategory = async (category: string) => {
   if (!category) return
   try {
      await connectDB()
      const products = await productModel.find({ category: category })
      return JSON.parse(JSON.stringify(products))
   } catch (err: Error | any) {
      throw new Error(err)
   }
}

export const productsGetByParams = async (params: any) => {
   if (!params) return
   try {
      await connectDB()
      const products = await productModel.find(params)
      return JSON.parse(JSON.stringify(products))
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
      return JSON.parse(JSON.stringify(data))
   } catch (err: Error | any) {
      throw new Error(err)
   }
}
