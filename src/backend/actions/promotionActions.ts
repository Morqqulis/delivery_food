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
      if (newPromo.applicableProducts?.length > 0) {
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

export const promoGetWithSeller = async (id: string) => {
   if (!id) return
   try {
      await connectDB()
      const promos = await promoModel.find({ seller: id }).populate({ path: 'applicableProducts', model: productModel })
      return await JSON.parse(JSON.stringify(promos))
   } catch (err: Error | any) {
      throw new Error(err)
   }
}

export const promoUpdateStatus = async (id: Types.ObjectId | undefined, status: boolean) => {
   if (!id) return
   try {
      await connectDB()
      const promo = await promoModel.findById(id)

      if (!promo) {
         throw new Error('Promotion not found')
      }

      const applicableProducts = promo.applicableProducts

      if (applicableProducts?.length > 0) {
         if (status === true) {
            await productModel.updateMany({ _id: { $in: applicableProducts } }, { $set: { promotions: promo._id } })
         } else {
            await productModel.updateMany({ _id: { $in: applicableProducts } }, { $set: { promotions: null } })
         }
      }

      promo.isActive = status
      await promo.save()

      return await JSON.parse(JSON.stringify(promo))
   } catch (err: Error | any) {
      throw new Error(err)
   }
}

export const promoDelete = async (id: Types.ObjectId | undefined, products: Types.ObjectId[]) => {
   if (!id) return
   try {
      await connectDB()
      await promoModel.deleteOne({ _id: id })

      if (products?.length > 0) {
         await productModel.updateMany({ _id: { $in: products } }, { $set: { promotions: null } })
      }

      return 'Promotion deleted successfully'
   } catch (err: Error | any) {
      throw new Error(err)
   }
}
