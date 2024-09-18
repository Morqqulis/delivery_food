'use client'
import CheckoutForm from '#sections/Basket/CheckoutForm'
import { useBasketStore } from '#stores/basketStore'
import Table from '#ui/Table/Table'
import { X } from 'lucide-react'
import { calculateTotal, getPrice, getTotal } from '../../../functions/helpers'
import Counter from '#ui/Counter/Counter'

const BasketSection: React.FC = (): JSX.Element => {
   const { removeFromBasket, basket, updateBasketStore } = useBasketStore()

   const tableHeader = ['Image', 'Name', 'Description', 'Count', 'Price', 'Total', '']
   const tableBody = basket.map((item) => {
      return {
         image: '/qazan.svg',
         name: `link*/products/${item._id}*${item.name}`,
         description: item.description,
         count: (
            <span className="flex flex-col gap-2">
               <Counter
                  count={item.quantity}
                  setCount={(prev) => {
                     updateBasketStore(item._id, prev - item.quantity, item.selectedAttributes)
                  }}
                  className="items-center justify-center"
               />
               {item?.promotions?.isActive
                  ? item.promotions?.discountType === 'buyXgetY' &&
                    item.promotions?.buyX &&
                    item.promotions?.getY &&
                    item.quantity >= item.promotions?.buyX
                     ? `(+${item.promotions?.getY} free)`
                     : item.promotions?.discountType === 'count&percentage' &&
                       item.promotions.discountValue &&
                       item.promotions.minimumOrderCount &&
                       item.promotions.minimumOrderCount <= item.quantity &&
                       `(-${item.promotions?.discountValue}% discount)`
                  : ''}
            </span>
         ),
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
