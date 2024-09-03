import { IUser } from '#types/index'
import { model, models, Schema, Types } from 'mongoose'
import product from '#backend/models/productModel'

const userSchema = new Schema<IUser>(
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
      password: {
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
      image: {
         type: String,
         required: false,
         default: null,
      },
      gender: {
         type: String,
         required: true,
         default: 'male',
      },
      role: {
         type: String,
         required: false,
         default: 'user',
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

const userModel = models.user || model('user', userSchema)

export default userModel
