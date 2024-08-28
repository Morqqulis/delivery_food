import { IOrder } from '#types/index'
import { model, models, Schema, Types } from 'mongoose'
import product from './productModel'
import user from './userModel'

const orderSchema = new Schema<IOrder>(
   {
      _id: {
         type: Schema.Types.ObjectId,
         required: true,
         default: () => new Types.ObjectId(),
      },
      payment: {
         type: String,
         required: true,
      },
      status: {
         type: String,
         required: true,
      },
      customer: {
         type: Schema.Types.ObjectId,
         ref: 'user',
         required: true,
      },
      customerNote: {
         type: String,
         required: false,
      },
      products: [
         {
            productId: {
               type: Schema.Types.ObjectId,
               ref: 'product',
               required: true,
            },
            quantity: {
               type: Number,
               required: true,
               default: 1,
            },
         },
      ],
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

export default models.order || model('order', orderSchema)
