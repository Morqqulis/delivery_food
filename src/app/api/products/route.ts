import { productGetAll } from '#backend/actions/productActions'
import { NextResponse } from 'next/server'

export async function GET() {
   try {
      return NextResponse.json(await productGetAll(), {
         status: 201,
         statusText: 'Products fetched successfully',
      })
   } catch (error) {
      return NextResponse.json(error, { status: 500, statusText: 'Internal Server Error from api/products' })
   }
}
