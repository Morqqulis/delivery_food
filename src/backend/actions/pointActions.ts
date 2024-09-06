'use server'

import { connectDB } from '#backend/DB'
import pointModel from '#backend/models/pointModel'
import { IPoint } from '#types/index'

export const pointCreate = async (data: IPoint) => {
   try {
      await connectDB()
      const point = (await pointModel.create(data)).toObject()
      return point
   } catch (err: Error | any) {
      throw new Error(err)
   }
}

export const pointGetOne = async (id: string) => {
   try {
      await connectDB()
      const point = await pointModel.findOne({ _id: id })
      return JSON.parse(JSON.stringify(point))
   } catch (err: Error | any) {
      throw new Error(err)
   }
}
