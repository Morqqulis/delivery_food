'use server'

import { connectDB } from '#backend/DB'
import orderModel from '#backend/models/orderModel'
import productModel from '#backend/models/productModel'
import sellerModel from '#backend/models/sellerModel'
import userModel from '#backend/models/userModel'
import { IBasket, IBasketItem, ICheckoutForm } from '#types/index'
import mongoose, { Types } from 'mongoose'

export const orderCreate = async (basket: IBasket[], session: { email: string; name: string }, form: ICheckoutForm) => {
   if (!basket || !session || !form) return
   const { phone, city, deliveryType, deliveryNote, sellerNote, street, village } = form

   try {
      await connectDB()

      let user = await userModel.findOne({ email: session.email })

      if (!user) {
         user = await userModel.create({
            name: session.name,
            phone: phone,
            password: '12345',
            email: session.email,
         })
      }
      const orderData = {
         phone: phone,
         adress: city + '' + street + '' + village,
         deliveryType: deliveryType,
         deliveryNote: deliveryNote,
         sellerNote: sellerNote,
         status: 'pending',
         customer: user._id,
         products: basket.map((product: any) => ({
            product: product._id,
            quantity: product.quantity,
         })),
      }

      const order = await orderModel.create(orderData)

      const sellerIds = Array.from(new Set(basket.map((item) => item.seller)))

      await Promise.all(
         sellerIds.map(async (sellerId) => {
            await sellerModel.updateOne({ _id: new Types.ObjectId(sellerId) }, { $push: { order: order._id } })
         }),
      )

      return JSON.parse(JSON.stringify(order))
   } catch (err: Error | any) {
      throw new Error(err)
   }
}

// export const orderCreate = async (basket: any, customer: string) => {
//    if (!basket || !customer) return
//    try {
//       await connectDB()

//       const orderData = {
//          payment: 'cash',
//          status: 'pending',
//          customer: new Types.ObjectId(customer),
//          customerNote: 'Sifarişləri yaxşı paketləyin',
//          products: basket.map((product: any) => ({
//             product: product.product._id,
//             quantity: product.quantity,
//          })),
//       }

//       const order = await orderModel.create(orderData)

//       await userModel.updateOne({ _id: new Types.ObjectId(customer) }, { $set: { basket: [] } })

//       const sellerIds = Array.from(
//          new Set(
//             basket.map(
//                (item: {
//                   product: {
//                      seller: string
//                   }
//                }) => item.product.seller,
//             ),
//          ),
//       )

//       await Promise.all(
//          sellerIds.map(async (sellerId) => {
//             // @ts-ignore
//             await sellerModel.updateOne({ _id: new Types.ObjectId(sellerId) }, { $push: { order: order._id } })
//          }),
//       )

//       return JSON.parse(JSON.stringify(order))
//    } catch (err: Error | any) {
//       throw new Error(err)
//    }
// }

export const orderGet = async (id: string) => {
   if (!id) return
   try {
      await connectDB()
      const order = await orderModel.findOne({ _id: id }).populate('customer').populate('products.product').lean()
      return order
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

export const orderUpdateStatus = async (id: string, status: string) => {
   if (!id) return

   try {
      await connectDB()
      const order = await orderModel.updateOne({ _id: id }, { status: status })
      return 'Updated'
   } catch (err: Error | any) {
      throw new Error(err)
   }
}
