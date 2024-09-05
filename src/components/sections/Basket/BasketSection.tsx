'use client'
import { coockieRemoveFromBasket, cookieGetBasket } from '#backend/actions/cookieBasketActions'
import { orderCreate } from '#backend/actions/orderAction'
import { productsGetByIds } from '#backend/actions/productActions'
import { userDeleteBasketItem, userGetBasket } from '#backend/actions/userActions'
import CheckoutForm from '#sections/Basket/CheckoutForm'
import { useBasketStore } from '#stores/basketStore'
import { IBasket, IBasketItem } from '#types/index'
import Btn from '#ui/Btn/Btn'
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '#ui/table'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

const BasketSection: React.FC = (): JSX.Element => {
   // const [basket, setBasket] = useState<IBasket[]>([])

   const { removeFromBasket, basket } = useBasketStore()

   // useEffect(() => {
   //    ;(async () => {
   //       const data = await cookieGetBasket()
   //       const basket = await productsGetByIds(data)
   //       // setBasket(basket)
   //    })()
   // }, [])

   const calculateTotal = () => {
      return basket
         ? basket.reduce((total: number, product: any) => total + product.price * product.quantity, 0).toFixed(2)
         : 0
   }

   const deleteBasket = async (id: string) => {
      removeFromBasket(id)
      // await coockieRemoveFromBasket(id)
      // setBasket(basket.filter((product: any) => product._id !== id))
   }
   console.log(basket)

   return (
      <div className="flex flex-col gap-6 p-3">
         <Table className="container">
            <TableCaption>A list of your basket.</TableCaption>
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
            {basket.length > 0 && (
               <TableBody>
                  {basket.map((product: any) => (
                     <TableRow key={product._id}>
                        <TableCell className="font-medium">{`${product._id.slice(0, 2)}***${product._id.slice(-4)}`}</TableCell>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{product.description}</TableCell>
                        <TableCell>{product.quantity}</TableCell>
                        <TableCell>{product.price}</TableCell>
                        <TableCell className="text-right">${(product.quantity * product.price).toFixed(2)}</TableCell>
                        <TableCell>
                           <p className="cursor-pointer" onClick={() => deleteBasket(product._id)}>
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

         {/* <CheckoutForm basket={basket} setBasket={setBasket} /> */}
      </div>
   )
}

export default BasketSection
