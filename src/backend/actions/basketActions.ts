'use server'

import { connectDB } from '#backend/DB'
import basketModel from '#backend/models/basketModel'
import { Types } from 'mongoose'

export const basketGetAll = async () => {
   try {
      await connectDB()
      return await basketModel.find({}).populate('userId').populate('products.productId').lean()
   } catch (err: Error | any) {
      throw new Error(err)
   }
}

export const basketGetOne = async (id: string) => {
   if (!id) return
   try {
      await connectDB()
      return await basketModel.findOne({ _id: id }).populate('userId').populate('products.productId').lean()
   } catch (err: Error | any) {
      throw new Error(err)
   }
}

export const basketGetUserId = async (userId: string) => {
   if (!userId) return
   try {
      await connectDB()
      return await basketModel.findOne({ userId: userId }).populate('userId').populate('products.productId').lean()
   } catch (err: Error | any) {}
}

export const basketCreateOrUpdate = async (data: { userId: string; productId: string; quantity: number }) => {
   if (!data) return

   try {
      await connectDB()

      let basket = await basketModel.findOne({ userId: new Types.ObjectId(data.userId) })

      if (basket) {
         const productIndex = basket.products.findIndex((p: { productId: Types.ObjectId }) =>
            p.productId.equals(data.productId),
         )

         if (productIndex !== -1) {
            basket.products[productIndex].quantity += data.quantity
         } else {
            basket.products.push({
               productId: new Types.ObjectId(data.productId),
               quantity: data.quantity,
            })
         }

         await basket.save()
      } else {
         basket = await basketModel.create({
            userId: new Types.ObjectId(data.userId),
            products: [
               {
                  productId: new Types.ObjectId(data.productId),
                  quantity: data.quantity,
               },
            ],
         })
      }

      return basket.toObject()
   } catch (err: Error | any) {
      throw new Error(err)
   }
}

export const basketDeleteProduct = async (data: { userId: string; productId: string }) => {
   if (!data) return

   try {
      await connectDB()
      const basket = await basketModel.findOne({ userId: new Types.ObjectId(data.userId) })

      basket.products = basket.products.filter(
         (p: { productId: Types.ObjectId }) => !p.productId.equals(new Types.ObjectId(data.productId)),
      )

      await basket.save()
      return basket.toObject()
   } catch (err: Error | any) {
      console.error('Error removing product from basket:', err)
      return { success: false, message: 'Error removing product from basket' }
   }
}
