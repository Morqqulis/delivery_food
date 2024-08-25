import { IUser } from '#types/index'
import { Schema, model, models } from 'mongoose'
import { v6 as uuidv6 } from 'uuid'
const userSchema = new Schema<IUser>(
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
      password: {
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
