'use server'

import { connectDB } from '#backend/DB'
import pointModel from '#backend/models/pointModel'
import { IPoint } from '#types/index'

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
      const point = await pointModel
         .findOne({ _id: id })
         .populate('orders.order') // 'orders.order' sahəsi üzrə doldurma
         .populate('products.product')
      return JSON.parse(JSON.stringify(point))
   } catch (err: Error | any) {
      throw new Error(err)
   }
}
