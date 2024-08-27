import { IUser } from '#types/index'
import { model, models, Schema, Types } from 'mongoose'
const userSchema = new Schema<IUser>(
   {
      _id: {
         type: String,
         required: true,
         default: () => new Types.ObjectId().toString(),
      },
      name: {
         type: String,
         required: true,
      },
      password: {
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
         required: false,
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

// const testSchema = new Schema(
//    {
//       text: {
//          type: String,
//          required: true,
//       },
//    },
//    {
//       timestamps: true,
//    },
// )

// const testModel = models.test || model('test', testSchema)

export default userModel
