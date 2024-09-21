import { IPoint } from '#types/index'
import { model, models, Schema, Types } from 'mongoose'
import order from '#backend/models/orderModel'
import product from '#backend/models/productModel'
import seller from '#backend/models/sellerModel'
const pointSchema = new Schema<IPoint>(
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

      phone: {
         type: String,
         required: true,
      },
      address: {
         type: String,
         required: true,
      },
      location:{
         lat: {
            type: Number,
            required: true,
         },
         log: {
            type: Number,
            required: true,
         },
      },
      createdAt: {
         type: Date,
         required: true,
         default: new Date(),
      },
   },
   {
      timestamps: true,
   },
)

export default models.point || model('point', pointSchema)
