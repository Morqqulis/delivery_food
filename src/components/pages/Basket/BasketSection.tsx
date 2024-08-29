'use client'
import { getProductsBySellerFromOrder, orderCreate } from '#backend/actions/orderAction'
import {
   productGetAll,
   productGetAllPopulate,
   productsGetByCategory,
   productGetById,
   productGetByIdWithPopulate,
} from '#backend/actions/productActions'
import { sellerCreate, sellerGetAll, sellerGetProductsWithSelect } from '#backend/actions/sellerActions'
import {
   userCreate,
   userDeleteBasketItem,
   userGetAll,
   userGetBasket,
   userGetById,
   userUpdateById,
} from '#backend/actions/userActions'
import Btn from '#ui/Btn/Btn'
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '#ui/table'
import { Types } from 'mongoose'
import { useEffect, useState } from 'react'
import { groupedBySeller } from '../../../functions/helpers'

const BasketSection: React.FC = (): JSX.Element => {
   const [basket, setBasket] = useState<any>(null)

   useEffect(() => {
      ;(async () => {
         const user = await userGetBasket('66cf65fb10760b3633230284')
         // @ts-ignore
         setBasket(user?.basket)
      })()
   }, [])

   const calculateTotal = () => {
      return basket
         ? basket
              .reduce((total: number, product: any) => total + product.product.price * product.quantity, 0)
              .toFixed(2)
         : 0
   }
   const deleteBasket = async (id: string) => {
      await userDeleteBasketItem('66cf65fb10760b3633230284', id)
      setBasket(basket.filter((product: any) => product.product._id !== id))
   }
   const getCheckout = async () => {
      // const order = {
      //    payment: 'cash',
      //    status: 'pending',
      //    customer: new Types.ObjectId('66cf65fb10760b3633230284'),
      //    customerNote: 'Sifarişləri yaxşı paketləyin',
      //    products: basket.map((product: any) => ({
      //       product: product.product._id,
      //       quantity: product.quantity,
      //    })),
      // }
      // console.log(await orderCreate(order, basket));

      // const seller = {
      //    _id: new Types.ObjectId(),
      //    name: 'seller 2',
      //    secondName: 'se000ller 2',
      //    address: 'seller 2 adress',
      //    phone: '559988998',
      //    email: 'seller2@seller1.com',
      //    password: 'salam',
      // }
      // console.log(await createOrderAndAssignToSellers(basket, '66cf65fb10760b3633230284'))
      // console.log(basket);

      console.log(await getProductsBySellerFromOrder('66d03c26d11082ecf3ed4603', '66d02490d14d9bc8e4366bd1'))
   }

   return (
      <div className="flex flex-col gap-6 p-3">
         <Table className="container">
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
               <TableRow>
                  <TableHead className="w-[100px]">Id</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Count</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead></TableHead>
               </TableRow>
            </TableHeader>
            {basket && (
               <TableBody>
                  {basket.map((product: any) => (
                     <TableRow key={product.product._id}>
                        <TableCell className="font-medium">{`${product.product._id.slice(0, 2)}***${product.product._id.slice(-4)}`}</TableCell>
                        <TableCell>{product.product.name}</TableCell>
                        <TableCell>{product.product.description}</TableCell>
                        <TableCell>{product.quantity}</TableCell>
                        <TableCell>{product.product.price}</TableCell>
                        <TableCell className="text-right">
                           ${(product.quantity * product.product.price).toFixed(2)}
                        </TableCell>
                        <TableCell>
                           <p className="cursor-pointer" onClick={() => deleteBasket(product.product._id)}>
                              Delete
                           </p>
                        </TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            )}
            <TableFooter>
               <TableRow>
                  <TableCell />
                  <TableCell>Total Amount</TableCell>
                  <TableCell />
                  <TableCell />
                  <TableCell />
                  <TableCell className="text-right">${calculateTotal()}</TableCell>
                  <TableCell />
               </TableRow>
            </TableFooter>
         </Table>
         <Btn className="w-fit" text="Checkout" ariaLabel="Checkout" onClick={getCheckout} />
      </div>
   )
}

export default BasketSection
const bb = [
   {
      product: {
         category: 'yeniler',

         createdAt: '2024-08-29T07:39:05.618Z',
         description: 'salam',
         image: './qazan.svg',
         name: 'Product  4',
         price: 12,
         seller: '66d024b4d14d9bc8e4366bd2',
         updatedAt: '2024-08-29T07:39:05.618Z',
         __v: 0,
         _id: '66d0259969461d9cb3dbc48a',
      },
      quantity: 5,
   },
   {
      product: {
         category: 'Yeni product',
         createdAt: '2024-08-29T07:38:10.715Z',
         description: 'SALAM',
         image: './qazan.svg',
         name: 'Product 2',
         price: 9,
         seller: '66d02490d14d9bc8e4366bd1',
         updatedAt: '2024-08-29T07:38:10.715Z',
         __v: 0,
         _id: '66d02562b73bc65906e6bc0d',
      },
      quantity: 4,
   },

   {
      product: {
         category: 'Yeni product',
         createdAt: '2024-08-29T07:37:28.601Z',
         description: 'salam',
         image: './qazan.svg',
         name: 'Product 1',
         price: 8,
         seller: '66d02490d14d9bc8e4366bd1',
         updatedAt: '2024-08-29T07:37:28.601Z',
         __v: 0,
         _id: '66d025381e1e1a184cc0b811',
      },
      quantity: 6,
   },
]

const orders = [
   {
      order1Id: [
         {
            productId: 'asasd',
            quantity: 5,
         },
         {
            productId: 'asasd',
            quantity: 5,
         },
         {
            productId: 'asasd',
            quantity: 5,
         },
      ],

      order2Id: [
         {
            productId: 'asasd',
            quantity: 5,
         },
         {
            productId: 'asasd',
            quantity: 5,
         },
         {
            productId: 'asasd',
            quantity: 5,
         },
      ],
   },
]
