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

// export async function GET(req: NextRequest, res: NextResponse) {
//    try {
//       const result: IProduct[] = await productGetAll()

//       return NextResponse.json(result, {
//          statusText: 'Products fetched successfully',
//          status: 201,
//       })
//    } catch (error) {
//       return NextResponse.json(
//          {
//             error: 'Something went wrong on the server while fetching all products: \n' + error,
//          },
//          { status: 500 },
//       )
//    }
// }

export async function POST(req: NextRequest, res: NextResponse) {
   try {
      const data: IProduct = await req.json()
      const newProduct = await productCreate(data)

      return NextResponse.json(newProduct, { status: 201, statusText: 'Product created successfully' })
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
            return NextResponse.json(result, { status: 201, statusText: 'Product deleted successfully' })
         }
      }
      const deletedProducts = await productDeleteAll()

      return NextResponse.json(deletedProducts, { status: 201, statusText: 'All products deleted successfully' })
   } catch (error) {
      return NextResponse.json(
         {
            error: 'Something went wrong on the server while deleting product by id: \n' + error,
         },
         { status: 500 },
      )
   }
}
