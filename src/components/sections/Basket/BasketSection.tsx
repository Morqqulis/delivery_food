'use client'

import CheckoutForm from '#sections/Basket/CheckoutForm'
import { useBasketStore } from '#stores/basketStore'
import Table from '#ui/Table/Table'
import { X } from 'lucide-react'

const BasketSection: React.FC = (): JSX.Element => {
   const { removeFromBasket, basket } = useBasketStore()

   const calculateTotal = () => {
      return basket
         ? basket.reduce((total: number, product: any) => total + product.price * product.quantity, 0).toFixed(2)
         : 0
   }

   const tableHeader = ['Image', 'Name', 'Description', 'Count', 'Price', 'Total', '']
   const tableBody = basket.map((item) => {
      return {
         image: '/qazan.svg',
         name: item.name,
         description: item.description,
         count: item.quantity,
         price: `$${item.price}`,
         total: `$${(item.price * item.quantity).toFixed(2)}`,
         actions: (
            <p className="cursor-pointer text-red-700" onClick={() => removeFromBasket(item._id)}>
               <X />
            </p>
         ),
      }
   })
   
   const tableFooter = ['', 'Total Amount', '', '', `$${calculateTotal()}`, '']

   return (
      <section className={`py-20`}>
         <div className="container">
            <h1 className={`mb-10 text-center text-5xl`}>Basket</h1>
            {basket.length > 0 ? (
               <div className="flex flex-col gap-6">
                  <Table headers={tableHeader} body={tableBody} footer={tableFooter} />
                  <CheckoutForm basket={basket} />
               </div>
            ) : (
               <h2 className={`text-center text-4xl font-bold text-tomato-200`}>Basket is empty</h2>
            )}
         </div>
      </section>
   )
}

export default BasketSection
