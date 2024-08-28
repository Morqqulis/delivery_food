'use server'

import { connectDB } from '#backend/DB'
import orderModel from '#backend/models/orderModel'
import sellerModel from '#backend/models/sellerModel'
import { IGroupedProductsOrders, IOrder } from '#types/index'
import { Types } from 'mongoose'

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

      return order
   } catch (err: Error | any) {
      throw new Error(err)
   }
}

export const orderGet = async (id: string) => {
   if (!id) return
   try {
      await connectDB()
      const order = await orderModel.findOne({ _id: id }).populate('customer').populate('products.productId').lean()
      return order
   } catch (err: Error | any) {
      throw new Error(err)
   }
}
