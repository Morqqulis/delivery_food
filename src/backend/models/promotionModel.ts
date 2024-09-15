import { Schema, model, models } from 'mongoose'
import product from './productModel'
import seller from './sellerModel'
import { IPromotion } from '#types/index'

const promoSchema = new Schema<IPromotion>(
   {
      seller: { type: Schema.Types.ObjectId, ref: 'seller', required: true },
      description: { type: String },
      name: { type: String, required: true },

      discountType: { type: String, enum: ['percentage', 'fixed', 'buyXgetY', 'freeShipping'], required: true },

      discountValue: {
         type: Number,
         required: function () {
            return this.discountType === 'percentage' || this.discountType === 'fixed'
         },
      },

      applicableProducts: [
         {
            type: Schema.Types.ObjectId,
            ref: 'product',
         },
      ], 

      startDate: { type: Date, required: true },
      // endDate: { type: Date, required: true, 
      //    index: { expires: '60s' } 
      // },
      isActive: { type: Boolean, default: true },
   },
   { timestamps: true },
)

// const promoSchema = new Schema<IPromotion>(
//    {
//
//

//       applicableCategories: [
//          {
//             type: String,
//             required: false, // Promosiyanı kateqoriyaya da aid bilərik (əgər alındıra bilsək .d )
//          },
//       ],

//       minimumOrderAmount: {
//          type: Number,
//          required: false, // Müəyyən məbləğdən yuxarı sifarişlər üçün promosiyalar
//       },

//       buyX: { type: Number, default: 0 }, // "2 al 1 ödə" promosiyası üçün alınan məhsul sayı
//       getY: { type: Number, default: 0 }, // "2 al 1 ödə" promosiyası üçün ödənilən məhsul sayı
//       discountedProduct: { type: Schema.Types.ObjectId, ref: 'product' }, // Endirimli ikinci məhsul (bir alana digəri endirimlə)

//       startDate: { type: Date, required: true }, // Promosiyanın başlanğıc tarixi
//       endDate: { type: Date, required: true, index: { expires: '0s' } }, // Promosiyanın bitmə tarixi

//       usageLimit: {
//          type: Number,
//          required: false, // Promosiyanın neçə dəfə istifadə oluna biləcəyini təyin edir
//       },

//       usageCount: {
//          type: Number,
//          default: 0, // Promosiyanın neçə dəfə istifadə olunduğunu izləmək üçün
//       },

//       isActive: { type: Boolean, default: true }, // Promosiyanın aktiv olub-olmaması
//    },
//    { timestamps: true },
// )

const promoModel = models.promotion || model('promotion', promoSchema)

export default promoModel
