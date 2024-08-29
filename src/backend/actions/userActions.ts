'use server'

import { connectDB } from '#backend/DB'
import userModel from '#backend/models/userModel'
import { IUser } from '#types/index'
import { Types } from 'mongoose'

export const userGetAll = async () => {
   try {
      await connectDB()
      const users = await userModel.find().lean()
      return JSON.parse(JSON.stringify(users))
   } catch (err: Error | any) {
      throw new Error(err)
   }
}

export const userGetById = async (id: string) => {
   if (!id) return
   try {
      await connectDB()
      const user = await userModel.findOne({ _id: id })
      return JSON.parse(JSON.stringify(user))
   } catch (err: Error | any) {
      throw new Error(err)
   }
}

export const userDeleteById = async (id: string) => {
   if (!id) return
   try {
      await connectDB()
      await userModel.deleteOne({ _id: id })
      return 'Deleted successfully'
   } catch (err: Error | any) {
      throw new Error(err)
   }
}

export const userUpdateById = async (id: string, data: any) => {
   if (!id || !data) return

   try {
      await connectDB()
      await userModel.updateOne({ _id: id }, data)
      return 'Updated successfully'
   } catch (err: Error | any) {
      throw new Error(err)
   }
}

export const userCreate = async (data: IUser) => {
   if (!data) return

   try {
      await connectDB()
      await userModel.create(data)
      return 'User created successfully'
   } catch (err: Error | any) {
      throw new Error(err)
   }
}

export const userAddToBasket = async (userId: string, product: string, quantity: number) => {
   if (!userId || !product || !quantity) return

   try {
      await connectDB()

      const user = await userModel.findOne({ _id: userId })

      if (user) {
         const productIndex = user.basket.findIndex((p: { product: string }) => p.product.toString() === product)

         if (productIndex !== -1) {
            user.basket[productIndex].quantity += quantity
         } else {
            user.basket.push({ product: product, quantity: quantity })
         }

         await user.save()

         return 'Added to basket successfully'
      }
   } catch (err: Error | any) {
      throw new Error(err)
   }
}

export const userGetBasket = async (userId: string) => {
   if (!userId) return
   try {
      await connectDB()
      const user = await userModel.findOne({ _id: userId }).populate({
         path: 'basket.product',
         model: 'product',
      })

      return JSON.parse(JSON.stringify(user))
   } catch (err: Error | any) {
      throw new Error(err)
   }
}

export const userDeleteBasketItem = async (userId: string, product: string) => {
   if (!userId || !product) return
   try {
      await connectDB()
      const user = await userModel.findOne({ _id: userId })
      if (user) {
         user.basket = user.basket.filter((item: any) => item.product.toString() !== product)
         await user.save()
         return 'Deleted successfully'
      }
   } catch (err: Error | any) {
      throw new Error(err)
   }
}

// export const startChangeStreamListener = async (userId: string) => {
//    await connectDB()
//    const changeStream = userModel.watch([
//       {
//          $match: {
//             'documentKey._id': userId,
//          },
//       },
//    ])
//    changeStream.on('change', (change) => {
//       console.log('Dəyişiklik aşkarlandı:', change)
//    })

//    changeStream.on('error', (error) => {
//       console.error('Change stream error:', error)
//    })

//    changeStream.on('end', () => {
//       console.log('Change stream bitdi.')
//    })
// }
