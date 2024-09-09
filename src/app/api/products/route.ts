import { productGetAll } from '#backend/actions/productActions'
import { connectDB } from '#backend/DB'
import productModel from '#backend/models/productModel'
import { NextResponse } from 'next/server'

export async function GET() {
   try {
      await connectDB()
      const products = await productModel.find()

      if (products.length > 0) {
         return NextResponse.json(products, {
            status: 201,
            statusText: 'Products fetched successfully',
         })
      }
   } catch (error) {
      return NextResponse.json(error, { status: 500, statusText: 'Internal Server Error from api/products' })
   }
}
