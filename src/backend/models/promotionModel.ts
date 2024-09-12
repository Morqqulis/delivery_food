import { Schema, model, models } from 'mongoose'
import product from './productModel'
import seller from './sellerModel'
import { IPromotion } from '#types/index'

const promoSchema = new Schema<IPromotion>(
   {
      name: { type: String, required: true }, // Promosiyanın adı
      discountAmount: { type: Number, default: 0 }, // Endirim miqdarı
      discountType: { type: String, enum: ['percentage', 'fixed', 'buy_x_get_y', 'free_shipping'], required: true }, // Promosiyanın növü
      buyX: { type: Number, default: 0 }, // "2 al 1 ödə" promosiyası üçün alınan məhsul sayı
      getY: { type: Number, default: 0 }, // "2 al 1 ödə" promosiyası üçün ödənilən məhsul sayı
      discountedProduct: { type: Schema.Types.ObjectId, ref: 'product' }, // Endirimli ikinci məhsul (bir alana digəri endirimlə)
      applicableProducts: [{ type: Schema.Types.ObjectId, ref: 'product' }], // Promosiyanın tətbiq olunduğu məhsullar
      seller: { type: Schema.Types.ObjectId, ref: 'seller' }, // Promosiyanın aid olduğu satıcı
      startDate: { type: Date, required: true }, // Promosiyanın başlanğıc tarixi
      endDate: { type: Date, required: true, index: { expires: '0s' } }, // Promosiyanın bitmə tarixi
      isActive: { type: Boolean, default: true }, // Promosiyanın aktiv olub-olmaması
   },
   { timestamps: true },
)

const promoModel = models.promo || model('promo', promoSchema)

export default promoModel
