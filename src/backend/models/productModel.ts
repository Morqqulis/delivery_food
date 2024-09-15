import { IProduct } from '#types/index'
import { model, models, Schema, Types } from 'mongoose'
import seller from '#backend/models/sellerModel'
import promotion from '#backend/models/promotionModel'
const productSchema: Schema = new Schema<IProduct>(
   {
      name: {
         type: String,
         required: true,
      },
      description: {
         type: String,
         required: true,
      },
      price: {
         type: Number,
         required: true,
      },
      comments: [
         {
            name: {
               type: String,
            },
            text: {
               type: String,
            },
            rating: {
               type: Number,
            },
            date: {
               type: Date,
            },
         },
      ],
      promotions: 
         {
            type: Schema.Types.ObjectId,
            ref: 'promotion',
         },
      
      attributes: {
         category: {
            main: {
               type: String,
               required: true,
            },
            sub: {
               type: String,
               required: true,
            },
            child: {
               type: String,
               required: true,
            },
         },
         size: [
            {
               type: String,
            },
         ],
         colors: [
            {
               type: String,
            },
         ],
      },

      image: {
         type: String,
         required: true,
      },

      seller: {
         type: Schema.Types.ObjectId,
         ref: 'seller',
         required: true,
      },
      viewed: {
         type: Number,
         default: 0,
      },
   },
   {
      timestamps: true,
   },
)

const productModel = models.product || model('product', productSchema)

export default productModel
