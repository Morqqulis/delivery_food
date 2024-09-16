import { IOrder } from '#types/index'
import { model, models, Schema, Types } from 'mongoose'
import product from './productModel'
import user from './userModel'
import point from './pointModel'

const orderSchema = new Schema<IOrder>(
   {
      _id: {
         type: Schema.Types.ObjectId,
         required: true,
         default: () => new Types.ObjectId(),
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
      sellerNote: {
         type: String,
         required: false,
      },
      deliveryType: {
         type: String,
         required: true,
      },
      deliveryNote: {
         type: String,
         required: false,
      },
      adress: {
         type: String,
         required: true,
      },
      products: [
         {
            product: {
               type: Schema.Types.ObjectId,
               ref: 'product',
               required: true,
            },
            quantity: {
               type: Number,
               required: true,
               default: 1,
            },
            accepted: {
               type: Boolean,
               default: false,
            },
            selectedAttributes: {
               size: {
                  type: String,
               },

               color: {
                  type: String,
               },
            },

            point: {
               type: Schema.Types.ObjectId,
               ref: 'point',
               required: true,
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
