import { IProduct } from '#types/index'
import { model, models, Schema } from 'mongoose'
import { v6 as uuidv6 } from 'uuid'

const productSchema: Schema = new Schema<IProduct>(
   {
      _id: {
         type: String,
         required: true,
         default: () => uuidv6(),
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
   },
   {
      timestamps: true,
   },
)

const productModel = models.product || model('product', productSchema)

export default productModel
