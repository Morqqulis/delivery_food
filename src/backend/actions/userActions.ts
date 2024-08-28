'use server'

import { connectDB } from '#backend/DB'
import userModel from '#backend/models/userModel'
import { Types } from 'mongoose'
export const userGetAll = async () => {
   try {
      await connectDB()

      return await userModel.find().lean()
   } catch (err: Error | any) {
      throw new Error(err)
   }
}

export const userGetById = async (id: string) => {
   if (!id) return
   try {
      await connectDB()

      return await userModel.findOne({ _id: id }).lean()
   } catch (err: Error | any) {
      throw new Error(err)
   }
}

export const userDeleteById = async (id: string) => {
   if (!id) return
   try {
      await connectDB()

      return await userModel.deleteOne({ _id: id }).lean()
   } catch (err: Error | any) {
      throw new Error(err)
   }
}

export const userUpdateById = async (id: string, data: any) => {
   if (!id || !data) return

   try {
      await connectDB()

      return await userModel.updateOne({ _id: id }, data).lean()
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

export const userAddToBasket = async (userId: string, productId: string, quantity: number) => {
   if (!userId || !productId || !quantity) return

   try {
      await connectDB()

      const user = await userModel.findOne({ _id: userId })

      if (user) {
         const productIndex = user.basket.findIndex((p: { productId: string }) => p.productId.toString() === productId)

         if (productIndex !== -1) {
            user.basket[productIndex].quantity += quantity
         } else {
            user.basket.push({ productId: productId, quantity: quantity })
         }

         await user.save()
      }
   } catch (err: Error | any) {
      throw new Error(err)
   }
}

export const userGetBasket = async (userId: string) => {
   if (!userId) return
   try {
      await connectDB()

      return await userModel
         .findOne({ _id: userId })
         .populate({
            path: 'basket.productId',
            model: 'product',
         })
         .lean()
   } catch (err: Error | any) {
      throw new Error(err)
   }
}

export const userDeleteBasketItem = async (userId: string, productId: string) => {
   if (!userId || !productId) return
   try {
      await connectDB()
      const user = await userModel.findOne({ _id: userId })
      if (user) {
         user.basket = user.basket.filter((item: any) => item.productId.toString() !== productId)
         await user.save()
         
      }
   } catch (err: Error | any) {
      throw new Error(err)
   }
}

export const startChangeStreamListener = async (userId: string) => {
   await connectDB()
   const changeStream = userModel.watch([
      {
         $match: {
            'documentKey._id': userId,
         },
      },
   ])
   changeStream.on('change', (change) => {
      console.log('Dəyişiklik aşkarlandı:', change)
   })

   changeStream.on('error', (error) => {
      console.error('Change stream error:', error)
   })

   changeStream.on('end', () => {
      console.log('Change stream bitdi.')
   })
}
