import { IProduct } from '#types/index'
import { model, models, Schema } from 'mongoose'
import seller from '#backend/models/sellerModel'

const productSchema: Schema = new Schema<IProduct>(
   {
      _id: {
         type: Schema.Types.ObjectId,
         required: true,
      },
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
      category: {
         type: String,
         required: true,
      },
      image: {
         type: String,
         required: false,
      },

      seller: {
         type: Schema.Types.ObjectId,
         ref: 'seller',
         required: true,
      },
   },
   {
      timestamps: true,
   },
)

const productModel = models.product || model('product', productSchema)

export default productModel
