'use server'

import { connectDB } from '#backend/DB'
import pointModel from '#backend/models/pointModel'
import product from '#backend/models/productModel'
import { IOrder, IOrderItem, IPoint } from '#types/index'

export const pointCreate = async (data: IPoint) => {
   try {
      await connectDB()
      const point = await pointModel.create(data)
      return JSON.parse(JSON.stringify(point))
   } catch (err: Error | any) {
      throw new Error(err)
   }
}

export const pointGetOne = async (id: string, select: string) => {
   try {
      await connectDB()
      const point = await pointModel.findOne({ _id: id }, select)
      return JSON.parse(JSON.stringify(point))
   } catch (err: Error | any) {
      throw new Error(err)
   }
}
export const pointGetByIdWithPopulate = async (id: string) => {
   if (!id) return
   try {
      await connectDB()
      const point = JSON.parse(
         JSON.stringify(
            await pointModel.findOne({ _id: id }).populate({
               path: 'orders',
               populate: {
                  path: 'products.product',
               },
            }),
         ),
      )

      // yuxarıda pointə uyğun orderi götürürük aşağıda isə orderə aid olan  məhsulları filter edib pointə aid olan məhsulları qaytarırıq. amma mongoose methodu ilə serverdə bu işi görən funksiya yazmalıyıq.

      const filteredPointData = {
         ...point,
         orders: point.orders.map((order: IOrder) => ({
            ...order,
            products: order.products.filter((product) => product.point.toString() === id.toString()),
         })),
      }

      return filteredPointData
   } catch (err: Error | any) {
      throw new Error(err)
   }
}
