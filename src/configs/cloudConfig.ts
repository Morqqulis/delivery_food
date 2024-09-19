import { v2 as cloudinary } from 'cloudinary'



export const cloudConfig = cloudinary.config({
   cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_ID,
   api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API,
   api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_SECRET, 
})
