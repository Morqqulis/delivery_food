'use client'

import { productGetByIdWithPromotion } from '#backend/actions/productActions'
import { promoCreate, promoGetAll } from '#backend/actions/promotionActions'
import CheckoutForm from '#sections/Basket/CheckoutForm'
import { useBasketStore } from '#stores/basketStore'
import { IBasket, IBasketItem, IProduct } from '#types/index'
import Table from '#ui/Table/Table'
import { X } from 'lucide-react'
import { Types } from 'mongoose'
import { useEffect } from 'react'
import { calculateTotal, getPrice, getTotal } from '../../../functions/helpers'

const BasketSection: React.FC = (): JSX.Element => {
   const { removeFromBasket, basket } = useBasketStore()

   // const namepromo = async () => {
   // const datas = {
   //    seller: new Types.ObjectId('66d02490d14d9bc8e4366bd1'),
   //    description: 'test',
   //    name: 'test',
   //    discountType: 'percentage',
   //    discountValue: 10,
   //    applicableProducts: [
   //       new Types.ObjectId('66e4822d10d3f91e7d2c2420'),
   //       new Types.ObjectId('66e484c8431f6f8155b38243'),
   //    ],
   //    startDate: new Date(),
   //    // endsDate: new Date(),
   //    isActive: true,
   // }
   // const data = await promoCreate(datas)
   // const promos = await promoGetAll()
   // const data = await productGetByIdWithPromotion('66e484c8431f6f8155b38243', '')
   // console.log(getPrice(data))
   // }

   const tableHeader = ['Image', 'Name', 'Description', 'Count', 'Price', 'Total', '']
   const tableBody = basket.map((item) => {
      return {
         image: '/qazan.svg',
         name: `link*/products/${item._id}*${item.name}`,
         description: item.description,
         count: item.quantity,
         price: `$${getPrice(item)}`,
         total: `$${getTotal(item)}`,
         actions: (
            <p className="cursor-pointer text-red-700" onClick={() => removeFromBasket(item._id)}>
               <X />
            </p>
         ),
      }
   })

   const tableFooter = ['', 'Total Amount', '', '', `$${calculateTotal(basket)}`, '']

   return (
      <section className={`py-20`}>
         <div className="container">
            <h1 className={`mb-10 text-center text-5xl`}>Basket</h1>
            {/* <button onClick={() => namepromo()}>namepromo</button> */}
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
