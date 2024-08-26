import {
   productCreate,
   productDeleteAll,
   productDeleteById,
   productGetAll,
   productGetById,
   productUpdateById,
} from '#backend/actions/productActions'
import { IProduct } from '#types/index'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, res: NextResponse) {
   try {
      const result: IProduct[] = await productGetAll()

      return NextResponse.json(
         {
            message: 'Products fetched successfully',
            products: result,
         },
         { status: 201 },
      )
   } catch (error) {
      return NextResponse.json(
         {
            error: 'Something went wrong on the server while fetching all products: \n' + error,
         },
         { status: 500 },
      )
   }
}

export async function POST(req: NextRequest, res: NextResponse) {
   try {
      const data: IProduct = await req.json()
      
      const newProduct = await productCreate(data)
      return NextResponse.json(
         {
            message: 'Product fetched successfully',
            'New Product': newProduct,
         },
         { status: 201 },
      )
   } catch (error) {
      return NextResponse.json(
         {
            error: 'Something went wrong on the server while create new product: \n' + error,
         },
         { status: 500 },
      )
   }
}

// export async function PATCH(req: NextRequest, res: NextResponse) {
//    try {
//       const data: IProduct = await req.json()
//       const result = await productUpdateById(String(data._id), { ...data })

//       return NextResponse.json(
//          {
//             message: 'Product updated successfully',
//             'Updated Product': result,
//          },
//          { status: 201 },
//       )
//    } catch (error) {
//       return NextResponse.json(
//          {
//             error: 'Something went wrong on the server while updating product: \n' + error,
//          },
//          { status: 500 },
//       )
//    }
// }

export async function DELETE(req: NextRequest, res: NextResponse) {
   try {
      const id: string = await req.json()
      if (id !== 'all') {
         const result = await productDeleteById(id)

         if (!result) {
            return NextResponse.json(
               {
                  error: `Product with ${id} not found`,
               },
               { status: 500 },
            )
         } else {
            return NextResponse.json(
               {
                  message: 'Product deleted successfully',
                  'Deleted Product': result,
               },
               { status: 201 },
            )
         }
      }
      const deletedProducts = await productDeleteAll()

      return NextResponse.json(
         {
            message: 'All products deleted successfully',
            'Deleted Products': deletedProducts,
         },
         { status: 201 },
      )
   } catch (error) {
      return NextResponse.json(
         {
            error: 'Something went wrong on the server while deleting product by id: \n' + error,
         },
         { status: 500 },
      )
   }
}
