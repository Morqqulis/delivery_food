'use server'

import { connectDB } from '#backend/DB'
import productModel from '#backend/models/productModel'
import promoModel from '#backend/models/promotionModel'
import { IPromotion } from '#types/index'
import { Types } from 'mongoose'

export const promoGetAll = async () => {
   try {
      await connectDB()
      const promos = await promoModel.find()
      return await JSON.parse(JSON.stringify(promos))
   } catch (err: Error | any) {
      throw new Error(err)
   }
}

export const promoCreate = async (promoData: IPromotion) => {
   try {
      await connectDB()
      const newPromo = await promoModel.create(promoData)
      if (newPromo.applicableProducts.length > 0) {
         // await productModel.updateMany({ _id: { $in: newPromo.applicableProducts } }, { $push: { promotions: newPromo._id } })
         await productModel.updateMany(
            { _id: { $in: newPromo.applicableProducts } },
            { promotions: new Types.ObjectId(newPromo._id) },
         )
      }
      return JSON.parse(JSON.stringify(newPromo))
   } catch (err: Error | any) {
      throw new Error(err)
   }
}
