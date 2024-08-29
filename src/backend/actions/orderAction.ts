'use server'

import { connectDB } from '#backend/DB'
import orderModel from '#backend/models/orderModel'
import sellerModel from '#backend/models/sellerModel'
import { IOrder } from '#types/index'
import mongoose, { Types } from 'mongoose'

export const orderCreate = async (data: IOrder, basket: any) => {
   if (!data) return
   try {
      await connectDB()
      const order = await orderModel.create(data)
      // basket.forEach(async (item: any) => {
      //    const { productId, quantity } = item

      //    await sellerModel.updateOne(
      //       { _id: productId.sellerId },
      //       { $push: { order: { productId: productId._id, quantity } } },
      //    )
      // })

      const sellerIds = Array.from(
         new Set(
            basket.map(
               (item: {
                  product: {
                     seller: string
                  }
               }) => item.product.seller,
            ),
         ),
      )

      await Promise.all(
         sellerIds.map(async (sellerId) => {
            // @ts-ignore
            await sellerModel.updateOne({ _id: new Types.ObjectId(sellerId) }, { $push: { order: order._id } })
         }),
      )

      return order
   } catch (err: Error | any) {
      throw new Error(err)
   }
}

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

// Məhsulları satıcıya görə qruplaşdırır
const groupProductsBySeller = (basket: { product: { seller: string; _id: string }; quantity: number }[]) => {
   return basket.reduce(
      (acc, item) => {
         const sellerId = item.product.seller

         if (!acc[sellerId]) {
            acc[sellerId] = []
         }

         acc[sellerId].push({
            productId: item.product._id,
            quantity: item.quantity,
         })

         return acc
      },
      {} as Record<string, { productId: string; quantity: number }[]>,
   )
}

export const getProductsBySellerFromOrder = async (orderId: string, sellerId: string) => {
   try {
      await connectDB()
      const order = await orderModel.aggregate([
         { $match: { _id: new Types.ObjectId(orderId), status: 'pending' } }, // Order ID ilə uyğun sifarişi tapırıq
         { $unwind: '$products' }, // Products arrayını ayrılmamış obyektlərə çeviririk
         {
            $lookup: {
               from: 'products', // products kolleksiyasını qoşuruq
               localField: 'products.product',
               foreignField: '_id',
               as: 'productDetails',
            },
         },
         { $unwind: '$productDetails' }, // ProductDetails arrayını ayrılmamış obyektlərə çeviririk
         {
            $match: {
               'productDetails.seller': new Types.ObjectId(sellerId), // Seller ID-ə uyğun məhsulları filter edirik
            },
         },
         {
            $project: {
               _id: 1,
               payment: 1,
               status: 1,
               customerNote: 1,
               createdAt: 1,
               'productDetails._id': 1,
               'productDetails.name': 1,
               'productDetails.price': 1,
               'productDetails.category': 1,
               'productDetails.description': 1,
               'productDetails.image': 1,
               quantity: '$products.quantity',
            },
         },
      ])

      return JSON.parse(JSON.stringify(order))
   } catch (error: any) {
      throw new Error('Error retrieving products by seller from order: ' + error.message)
   }
}
