import { IOrder, IOrderItem } from '#types/index'
import { model, models, Schema, Types } from 'mongoose'
import product from './productModel'
import user from './userModel'
import point from './pointModel'
import seller from './sellerModel'
import promotion from './promotionModel'
const orderSchema = new Schema<IOrder & { products: IOrderItem }>(
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
      sellers: [
         {
            seller: {
               type: Schema.Types.ObjectId,
               ref: 'seller',
               required: true,
            },
            point: {
               type: Schema.Types.ObjectId,
               ref: 'point',
               required: true,
            },
            amount: {
               type: Number,
               required: true,
            },
            payment: {
               type: Boolean,
               default: false,
            },
         },
      ],
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
            soldPrice: {
               type: Number,
               required: true,
            },
            promotions: {
               type: Schema.Types.ObjectId,
               ref: 'promotion',
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
