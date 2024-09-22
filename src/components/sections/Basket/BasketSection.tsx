'use client'
import CheckoutForm from '#sections/Basket/CheckoutForm'
import { useBasketStore } from '#stores/basketStore'
import Table from '#ui/Table/Table'
import { X } from 'lucide-react'
import { averageRating, calculateTotal, getDeliveryPrice, getPrice, getTotal } from '../../../functions/helpers'
import Counter from '#ui/Counter/Counter'
import { IBasket, IComment, IPoint, IProduct } from '#types/index'
import Image from 'next/image'
import BasketDiscountSection from './BasketDiscountSection'
import StarRating from '#sections/Comments/StarRating'
import Link from 'next/link'

const BasketSection: React.FC = (): JSX.Element => {
   const { removeFromBasket, basket, updateBasketStore } = useBasketStore()

   const basketGrouppedPoint = basket.reduce(
      (acc, item) => {
         const key = item?.seller?.point._id.toString()
         const point = item?.seller?.point
         const deliveryPrice = +getDeliveryPrice(
            item?.seller?.point?.location.lat,
            item?.seller?.point?.location.lon,
            40.4441512,
            50.1651573,
         ).toFixed(2)
         if (!acc[key]) {
            acc[key] = {
               point,
               products: [],
               deliveryPrice,
            }
         }

         acc[key].products.push(item)
         return acc
      },
      {} as Record<string, { point: IPoint; products: IBasket[]; deliveryPrice: number }>,
   )
   const totalDelivery = Object.values(basketGrouppedPoint).reduce((a, b) => a + b.deliveryPrice, 0)
   const totalPrice = calculateTotal(basket)

   // const tableHeader = ['Image', 'Name', 'Description', 'Count', 'Price', 'Total', '']
   // const tableBody = basket.map((item) => {
   //    return {
   //       image: '/qazan.svg',
   //       name: `link*/products/${item._id}*${item.name}`,
   //       description: item.description,
   //       count: (
   //          <span className="flex flex-col gap-2">
   //             <Counter
   //                count={item.quantity}
   //                setCount={(prev) => {
   //                   updateBasketStore(item._id, prev - item.quantity, item.selectedAttributes)
   //                }}
   //                className="items-center justify-center"
   //             />
   //             {item?.promotions?.isActive
   //                ? item.promotions?.discountType === 'buyXgetY' &&
   //                  item.promotions?.buyX &&
   //                  item.promotions?.getY &&
   //                  item.quantity >= item.promotions?.buyX
   //                   ? `(+${item.promotions?.getY} free)`
   //                   : item.promotions?.discountType === 'count&percentage' &&
   //                     item.promotions.discountValue &&
   //                     item.promotions.minimumOrderCount &&
   //                     item.promotions.minimumOrderCount <= item.quantity &&
   //                     `(-${item.promotions?.discountValue}% discount)`
   //                : ''}
   //          </span>
   //       ),
   //       price: `$${getPrice(item)}`,
   //       total: `$${getTotal(item)}`,
   //       actions: (
   //          <p className="cursor-pointer text-red-700" onClick={() => removeFromBasket(item._id)}>
   //             <X />
   //          </p>
   //       ),
   //    }
   // })

   // const tableFooter = ['', 'Total Amount', '', '', `$${calculateTotal(basket)}`, '']

   return (
      <section className={`py-10`}>
         <div className="container">
            {basket.length > 0 ? (
               <div className="flex flex-col gap-6">
                  {Object.values(basketGrouppedPoint).map((item) => {
                     return (
                        <div className="w-full shadow-2xl" key={item.point._id.toString()}>
                           <div className="flex gap-5 bg-blue-950 p-3 font-bold">
                              {item.point.name} <span>-</span> <span>Phone: {item.point.phone}</span> <span>-</span>{' '}
                              <span>Delivery Price: {item.deliveryPrice}</span>
                           </div>
                           <div className="flex flex-col gap-3 bg-slate-700 p-3">
                              {item.products.map((product) => {
                                 const price = getPrice(product)
                                 return (
                                    <div key={product._id} className="flex justify-between border p-3">
                                       <Image src={product.image[0]} alt={product.name} width={100} height={100} />
                                       <div className="flex h-full w-full flex-col p-5">
                                          <Link href={`/products/${product._id}`} className='underline'>{product.name}</Link>
                                          <p>{product.description}</p>
                                          {product?.promotions?.isActive && (
                                             <BasketDiscountSection promotions={product.promotions} />
                                          )}
                                       </div>
                                       <div className="flex flex-col items-center gap-2">
                                          <p
                                             className="flex w-full cursor-pointer justify-end text-red-700"
                                             onClick={() => removeFromBasket(product._id)}
                                          >
                                             <X />
                                          </p>
                                          {price?.toString().startsWith('discount') ? (
                                             <span className="flex gap-2">
                                                <span className="line-through">${price.toString().split('/')[1]}</span>
                                                &nbsp;
                                                <span className="font-bold">${price.toString().split('/')[2]}</span>
                                             </span>
                                          ) : (
                                             `$${product.price}`
                                          )}

                                          <Counter
                                             count={product.quantity}
                                             setCount={(prev) => {
                                                updateBasketStore(
                                                   product._id,
                                                   prev - product.quantity,
                                                   product.selectedAttributes,
                                                )
                                             }}
                                             className="items-center justify-center"
                                          />
                                          <span>
                                             $
                                             {price?.toString().startsWith('discount')
                                                ? (+price.toString().split('/')[2] * product.quantity).toFixed(2)
                                                : (product.price * product.quantity).toFixed(2)}
                                          </span>
                                       </div>
                                    </div>
                                 )
                              })}
                           </div>
                        </div>
                     )
                  })}
               </div>
            ) : (
               <h2 className={`text-center text-4xl font-bold text-tomato-200`}>Basket is empty</h2>
            )}
            {basket.length > 0 && (
               <div className="mt-5 flex w-full items-center justify-between">
                  <div>
                     <CheckoutForm basket={basket} />
                  </div>
                  <div>
                     Total: ${calculateTotal(basket)}
                     <br />
                     Delivery: ${totalDelivery}
                     <br />
                     Sum: ${totalPrice ? totalPrice + totalDelivery : 0}
                  </div>
               </div>
            )}
         </div>
      </section>
   )
}

export default BasketSection
