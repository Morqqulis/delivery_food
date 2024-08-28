'use client'
import { orderCreate } from '#backend/actions/orderAction'
import { userDeleteBasketItem, userGetBasket } from '#backend/actions/userActions'
import Btn from '#ui/Btn/Btn'
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '#ui/table'
import { Types } from 'mongoose'
import { useEffect, useState } from 'react'

const BasketSection: React.FC = (): JSX.Element => {
   const [basket, setBasket] = useState<any>(null)

   useEffect(() => {
      ;(async () => {
         const user = await userGetBasket('66cf65fb10760b3633230284')
         setBasket(user?.basket)
      })()
   }, [])

   const calculateTotal = () => {
      return basket
         ? basket
              .reduce((total: number, product: any) => total + product.productId.price * product.quantity, 0)
              .toFixed(2)
         : 0
   }
   const deleteBasket = async (id: string) => {
      await userDeleteBasketItem('66cf65fb10760b3633230284', id)
   }
   const getCheckout = async () => {
      const order = {
         payment: 'cash',
         status: 'pending',
         customer: new Types.ObjectId('66cf65fb10760b3633230284'),
         customerNote: 'Sifarişləri yaxşı paketləyin',
         products: basket.map((product: any) => ({
            productId: product.productId._id,
            quantity: product.quantity,
         })),
      }
      await orderCreate(order, basket)
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
                     <TableRow key={product.productId._id}>
                        <TableCell className="font-medium">{`${product.productId._id.slice(0, 2)}***${product.productId._id.slice(-4)}`}</TableCell>
                        <TableCell>{product.productId.name}</TableCell>
                        <TableCell>{product.productId.description}</TableCell>
                        <TableCell>{product.quantity}</TableCell>
                        <TableCell>{product.productId.price}</TableCell>
                        <TableCell className="text-right">
                           ${(product.quantity * product.productId.price).toFixed(2)}
                        </TableCell>
                        <TableCell>
                           <p className="cursor-pointer" onClick={() => deleteBasket(product.productId._id)}>
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
