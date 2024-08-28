import { IProduct } from '#types/index'
import { model, models, Schema, Types } from 'mongoose'

const productSchema: Schema = new Schema<IProduct>(
   {
      _id: {
         type: String,
         required: true,
         default: () => new Types.ObjectId(),
      },
      name: {
         type: String,
         required: true,
      },
      description: {
         type: String,
         required: true,
      },
      basket: {
         type: [
            {
               productId: { type: String, required: true },
               quantity: { type: Number, required: true, default: 1 },
            },
         ],
         default: [],
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
   },
   {
      timestamps: true,
   },
)

const productModel = models.product || model('product', productSchema)

export default productModel
