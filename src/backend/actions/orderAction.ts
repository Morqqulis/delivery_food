'use server'

import { connectDB } from '#backend/DB'
import orderModel from '#backend/models/orderModel'
import pointModel from '#backend/models/pointModel'
import productModel from '#backend/models/productModel'
import sellerModel from '#backend/models/sellerModel'
import userModel from '#backend/models/userModel'
import { I0rderSeller, IBasket, IBasketItem, ICheckoutForm } from '#types/index'
import mongoose, { Types } from 'mongoose'
import { sellerGetByIdWithSelect } from './sellerActions'
import { productGetByIdWithPopulate } from './productActions'
import { calculateTotal, getPrice } from '../../functions/helpers'

export const orderCreate = async (basket: IBasket[], session: { email: string; name: string }, form: ICheckoutForm) => {
   if (!basket || !session || !form) return
   const { phone, city, deliveryType, deliveryNote, sellerNote, street, village } = form

   try {
      await connectDB()

      const user = await userModel.findOneAndUpdate(
         { email: session.email },
         { name: session.name, phone, email: session.email },
         { new: true, upsert: true },
      )

      const products = await Promise.all(
         basket.map(async (product) => {
            const price = getPrice(product)
            return {
               product: product._id,
               price: price?.toString().startsWith('discount') ? +price?.toString().split('/')[2] : price,
               promotions: product?.promotions?._id || null,
               quantity: product.quantity,
               point: product.seller.point,
               selectedAttributes: product.selectedAttributes,
            }
         }),
      )
      const sellers = basket.reduce((acc, item) => {
         const existingSeller = acc.find((seller) => seller.seller === item.seller._id)
         if (!existingSeller) {
            acc.push({
               // @ts-ignore
               seller: item.seller._id,
               point: item.seller.point,
               payment: false,
               amount: calculateTotal(basket.filter((i) => i.seller === item.seller)) || 0,
            })
         }

         return acc
      }, [] as I0rderSeller[])

      const order = await orderModel.create({
         phone,
         adress: city + '' + street + '' + village,
         deliveryType,
         deliveryNote,
         sellerNote,
         status: 'pending',
         customer: user._id,
         products,
         sellers,
      })

      return JSON.parse(JSON.stringify(order))
   } catch (err: Error | any) {
      throw new Error(err)
   }
}

export const orderGet = async (id: string) => {
   if (!id) return
   try {
      await connectDB()
      const order = await orderModel.findOne({ _id: id }).populate('customer').populate('products.product')
      return JSON.parse(JSON.stringify(order))
   } catch (err: Error | any) {
      throw new Error(err)
   }
}

export const orderGetWithUserId = async (userId: string) => {
   if (!userId) return
   try {
      await connectDB()
      const order = await orderModel.find({ customer: userId }).populate('products.product')
      return JSON.parse(JSON.stringify(order))
   } catch (err: Error | any) {
      throw new Error(err)
   }
}

export const orderGetAll = async () => {
   try {
      await connectDB()
      const orders = await orderModel.find().populate('customer').populate('products.product')
      return JSON.parse(JSON.stringify(orders))
   } catch (err: Error | any) {
      throw new Error(err)
   }
}

export const orderDelete = async (orderId: string) => {
   if (!orderId) return

   try {
      await connectDB()

      const session = await mongoose.startSession()
      session.startTransaction()

      try {
         const order = await orderModel
            .findById(orderId)
            .populate({
               path: 'products.product',
               select: 'seller',
            })
            .session(session)

         if (!order) throw new Error('Order not found')

         const sellerProductMap: Record<string, Types.ObjectId[]> = {}

         for (const item of order.products) {
            const product = item.product
            if (product) {
               const sellerId = product.seller.toString()
               if (!sellerProductMap[sellerId]) {
                  sellerProductMap[sellerId] = []
               }
               sellerProductMap[sellerId].push(new Types.ObjectId(orderId))
            }
         }

         await Promise.all(
            Object.entries(sellerProductMap).map(async ([sellerId, orderIds]) => {
               await sellerModel.updateOne(
                  { _id: new Types.ObjectId(sellerId) },
                  { $pullAll: { order: orderIds } },
                  { session },
               )
            }),
         )

         await orderModel.deleteOne({ _id: new Types.ObjectId(orderId) }).session(session)

         await session.commitTransaction()
         session.endSession()
      } catch (error) {
         await session.abortTransaction()
         session.endSession()
         throw new Error('Error deleting order: ' + error)
      }
   } catch (error: any) {
      throw new Error('Error connecting to database: ' + error.message)
   }
}

export const orderUpdateStatus = async (id: Types.ObjectId, status: string) => {
   if (!id) return

   try {
      await connectDB()
      const order = await orderModel.updateOne({ _id: id }, { status: status })
      return 'Updated'
   } catch (err: Error | any) {
      throw new Error(err)
   }
}

export const updateProductAcceptedStatus = async (
   orderId: Types.ObjectId,
   productId: Types.ObjectId,
   value: boolean,
) => {
   if (!orderId || !productId) return

   try {
      await connectDB()

      const updatedOrder = await orderModel.updateOne(
         {
            _id: orderId,
            'products.product': productId,
         },
         {
            $set: { 'products.$.accepted': value },
         },
         { new: true },
      )

      return updatedOrder
   } catch (err: Error | any) {
      throw new Error(err)
   }
}

export const ordersFindWithProduct = async (productId: string) => {
   try {
      await connectDB()

      const orders = await orderModel.aggregate([
         {
            $match: {
               'products.product': new Types.ObjectId(productId),
            },
         },
      ])

      return JSON.parse(JSON.stringify(orders))
   } catch (error) {
      console.error('Error finding orders with product:', error)
      return null
   }
}
