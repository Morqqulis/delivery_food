import { productDeleteById, productGetAll, productGetById, productUpdateById } from '#backend/actions/productActions'
import { IParamsID, IProduct } from '#types/index'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, res: NextResponse, { params }: IParamsID) {
   try {
      const product: IProduct = await productGetById(params.id)

      return NextResponse.json(
         {
            message: 'Product fetched successfully',
            data: product,
         },
         { status: 201 },
      )
   } catch (error) {
      return NextResponse.json(
         {
            error: 'Something went wrong on the server while fetching product by id',
         },
         { status: 500 },
      )
   }
}
// export async function POST(req: NextRequest, res: NextResponse, { params }: IParamsID) {
//    try {

//    } catch (error) {}
// }
export async function PATCH(req: NextRequest, res: NextResponse, { params }: IParamsID) {
   try {
      const updatedData: IProduct = await req.json()

      const result = await productUpdateById(params.id, updatedData)

      return NextResponse.json(
         {
            message: 'Product updated successfully',
            "Updated Product": result,
         },
         { status: 201 },
      )
   } catch (error) {
      return NextResponse.json(
         {
            error: 'Something went wrong on the server while updating product',
         },
         { status: 500 },
      )
   }
}
export async function DELETE(req: NextRequest, res: NextResponse, { params }: IParamsID) {
   try {
      const result = await productDeleteById(params.id)
      const allProducts = await productGetAll()
      return NextResponse.json(
         {
            message: 'Product deleted successfully',
            'Deleted Product': result,
            'All Products': allProducts,
         },
         { status: 201 },
      )
   } catch (error) {
      return NextResponse.json(
         {
            error: 'Something went wrong on the server while deleting product',
         },
         { status: 500 },
      )
   }
}
