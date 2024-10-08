import { ISeller } from '#types/index'
import product from '#backend/models/productModel'
import point from '#backend/models/pointModel'
import { model, models, Schema, Types } from 'mongoose'
const sellerSchema = new Schema<ISeller>(
   {
      _id: {
         type: Schema.Types.ObjectId,
         required: true,
         default: () => new Types.ObjectId(),
      },
      name: {
         type: String,
         required: true,
      },
      secondName: {
         type: String,
         required: true,
      },
      point: {
         type: Schema.Types.ObjectId,
         ref: 'point',
      },
      address: {
         type: String,
         required: true,
      },

      phone: {
         type: String,
         required: true,
      },
      email: {
         type: String,
         required: true,
      },
      password: {
         type: String,
         required: true,
      },
      products: [
         {
            type: Schema.Types.ObjectId,
            ref: 'product',
         },
      ],
      image: {
         type: String,
         required: false,
         default: null,
      },

      createdAt: {
         type: Date,
         default: Date.now,
      },
   },
   {
      timestamps: true,
   },
)

const sellerModel = models.seller || model('seller', sellerSchema)

export default sellerModel
