'use server'

import { connectDB } from '#backend/DB'
import orderModel from '#backend/models/orderModel'
import pointModel from '#backend/models/pointModel'
import productModel from '#backend/models/productModel'
import sellerModel from '#backend/models/sellerModel'
import userModel from '#backend/models/userModel'
import { IBasket, IBasketItem, ICheckoutForm } from '#types/index'
import mongoose, { Types } from 'mongoose'
import { sellerGetByIdWithSelect } from './sellerActions'
import { productGetByIdWithPopulate } from './productActions'

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
            const {
               seller: { point },
            } = await productGetByIdWithPopulate(product._id, 'seller', 'point')
            return { product: product._id, quantity: product.quantity, point }
         }),
      )

      const order = await orderModel.create({
         phone,
         adress: city + '' + street + '' + village,
         deliveryType,
         deliveryNote,
         sellerNote,
         status: 'pending',
         customer: user._id,
         products,
      })

      // satıcılara sifarişlər haqqında məlumat verilməsi
      const sellers = Array.from(new Set(basket.map((item) => item.seller)))
      await sellerModel.updateMany({ _id: { $in: sellers } }, { $push: { order: order._id } })

      // cəmləşmə nöqtələrinə sifarişlər haqqında məlumat verilməsi
      const pointOrders: Record<string, { order: Types.ObjectId; products: { product: string; quantity: number }[] }> =
         {}

      order.products.forEach((prod: { product: string; quantity: number; point: Types.ObjectId }) => {
         const pointId = prod.point.toString()

         if (!pointOrders[pointId]) {
            pointOrders[pointId] = {
               order: order._id,
               products: [],
            }
         }

         pointOrders[pointId].products.push({
            product: prod.product,
            quantity: prod.quantity,
         })
      })

      await Promise.all(
         Object.keys(pointOrders).map(async (pointId) => {
            await pointModel.updateOne(
               { _id: pointId },
               {
                  $push: {
                     orders: {
                        order: pointOrders[pointId].order,
                        products: pointOrders[pointId].products,
                     },
                  },
               },
            )
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
      const order = await orderModel.findOne({ _id: id }).populate('customer').populate('products.product')
      return JSON.parse(JSON.stringify(order))
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
