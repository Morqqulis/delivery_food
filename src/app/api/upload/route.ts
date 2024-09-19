import { NextRequest, NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'
import { cloudConfig } from '#configs/cloudConfig'

cloudinary.config(cloudConfig)

export async function POST(request: Request) {
   try {
      const { images } = await request.json()
      if (!images || images.length === 0) {
         return NextResponse.json({ error: 'No images provided' }, { status: 400 })
      }

      const uploadResults = await Promise.all(
         images.map((image: string) => cloudinary.uploader.upload(image, { folder: 'delivery_food' })),
      )

      const urls = uploadResults.map((result) => result.secure_url)

      return NextResponse.json({ urls }, { status: 200 })
   } catch (error) {
      return NextResponse.json({ error: 'Failed to upload images' }, { status: 500 })
   }
}
