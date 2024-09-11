import { productGetAll } from '#backend/actions/productActions'
import { connectDB } from '#backend/DB'
import productModel from '#backend/models/productModel'
import { NextResponse } from 'next/server'

export async function GET() {
   try {
      const products = await productGetAll()

      if (products.length > 0) {
         return NextResponse.json(products, {
            status: 201,
            statusText: 'Products fetched successfully',
         })
      }
   } catch (error) {
      console.log('Error in api products route GET: ', error)

      return NextResponse.json(null, { statusText: 'No data' })
   }
}
