import { connectDB } from '#backend/DB'
import promoModel from '#backend/models/promotionModel'
import { IPromotion } from '#types/index'

export const promoCreate = async (promoData: IPromotion) => {
   try {
      await connectDB()
      const data = {
         name: 'test',
         discountAmount: 10,
         discountType: 'percentage',
         discountedProduct: 'prod._id',
         applicableProducts: 'prod._id',
         seller: 'prod.seller._id',
         startDate: new Date(),
         endDate: new Date(),
      }
      const newPromo = await promoModel.create(data)
      return JSON.parse(JSON.stringify(newPromo))
   } catch (error) {
      console.error('Promosiyanı yaratmaq zamanı xəta:', error)
      return { success: false, message: 'Promosiyanı yaratmaq zamanı xəta baş verdi' }
   }
}
