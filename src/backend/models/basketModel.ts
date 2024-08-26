import { model, models, Schema, Types } from 'mongoose'
import product from '#backend/models/productModel'
import user from '#backend/models/userModel'

const basketSchema: Schema = new Schema(
   {
      _id: {
         type: Schema.Types.ObjectId,
         required: true,
         default: () => new Types.ObjectId(),
      },
      userId: { type: Schema.Types.ObjectId, ref: user, required: true },
      products: [
         {
            productId: { type: Schema.Types.ObjectId, ref: product, required: true },
            quantity: { type: Number, default: 1 },
         },
      ],
   },
   { timestamps: true },
)

const basketModel = models.basket || model('basket', basketSchema)

export default basketModel


