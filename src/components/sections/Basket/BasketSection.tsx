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
      <div className="flex flex-col gap-6 p-10">
         <Table headers={tableHeader} body={tableBody} footer={tableFooter} />
         <CheckoutForm basket={basket} />
      </div>
   )
}

export default BasketSection
