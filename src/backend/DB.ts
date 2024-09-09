import mongoose from 'mongoose'
export const connectDB = async () => {
   if (mongoose.connections[0].readyState) {
      console.log('Already connected')
      return
   }

   await mongoose.connect(process.env.MONGODB_URI!, {
      dbName: 'DB',
      serverApi: {
         strict: true,
         deprecationErrors: true,
         version: '1',
      },
   })

   console.log('Connected to MongoDB')
}

export const disconnectDB = async () => {
   await mongoose.disconnect()
}

//----------------------------------------------
