'use client'
import { productGetById, productGetByIdWithPopulate, productUpdateById } from '#backend/actions/productActions'
import CommentsHero from '#sections/Comments/CommentsHero'
import StarRating from '#sections/Comments/StarRating'
import { IProduct, ISelectedAttributes } from '#types/index'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { averageRating, getPrice } from '../../../functions/helpers'
import Link from 'next/link'
import LikeHeart from '#ui/LikeHeart'
import { cookieUpdateRecently } from '#backend/actions/cookieRecently'
import { ordersFindWithProduct } from '#backend/actions/orderAction'

import Options from './Options'
import { useQuery } from '@tanstack/react-query'
import ProductBread from './ProductBread'
import Counter from '#ui/Counter/Counter'
import Btn from '#ui/Btn/Btn'
import { useBasketStore } from '#stores/basketStore'
import SliderContainer from './SliderContainer'
import PromotionSection from './PromotionSection'

const ProductDetail: React.FC<{ id: string }> = ({ id }): JSX.Element => {
   const [count, setCount] = useState(1)
   const [selectedAttributes, setSelectedAttributes] = useState<ISelectedAttributes>({})

   const { isError, isLoading, data } = useQuery({
      queryKey: ['get product details'],
      queryFn: async () => {
         if (!id) return
         const prod = await productGetByIdWithPopulate(id, '', 'name secondName')
         const orders = await ordersFindWithProduct(id)
         prod.viewed += 1
         await productUpdateById(id, { viewed: prod?.viewed })
         await cookieUpdateRecently(id)

         const price = getPrice(prod)

         return {
            ...prod,
            price,
            ordersCount: orders.length,
         } as IProduct & { ordersCount: number }
      },
      enabled: !!id,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
   })
   const addToBasket = useBasketStore((state) => state.addToBasket)
   const handleAddToBasket = async () => {
      await addToBasket(id, count, selectedAttributes)
      setCount(1)
   }

   return (
      <section className={`py-20`}>
         <div className="container">
            {isLoading && <p>Loading...</p>}
            {isError && <p>Error</p>}
            {data && (
               <>
                  <ProductBread category={data.attributes.category} />
                  <div className="flex w-full items-center gap-3 p-5">
                     <div className="relative h-[500px] w-[50%] p-2">
                        <Image
                           src={data?.image}
                           width={500}
                           height={500}
                           alt={'product image'}
                           className="h-full w-full"
                        />
                        <LikeHeart id={id} />
                     </div>
                     <div className="flex w-[50%] flex-col p-2">
                        <div className="border-b-[0.3px] border-gray-400 pb-4">
                           <h1 className={`mb-1 text-5xl font-bold text-blue-700`}>{data.name}</h1>
                        </div>
                        <div className="border-b-[0.3px] border-gray-400 py-4">
                           <p>{data?.description}</p>
                        </div>
                        <div className="border-b-[0.3px] border-gray-400 py-4">
                           <div className="flex gap-2">
                              <Link href={`/store/${data?.seller?._id}`} className="font-bold">
                                 {data?.seller?.name}
                              </Link>
                              <StarRating rating={4.4} size="10" />
                           </div>
                           <p>{data?.seller?.secondName}</p>
                        </div>
                        <div className="flex items-center border-b-[0.3px] border-gray-400 py-3">
                           Price:&nbsp;&nbsp;$&nbsp;
                           {data.price.toString().startsWith('discount') ? (
                              <div className="flex items-center gap-2">
                                 <span className="text-[16px] line-through">{data.price.toString().split('/')[1]}</span>
                                 <span className="text-[18px] font-bold">{data.price.toString().split('/')[2]}</span>
                              </div>
                           ) : (
                              data.price
                           )}
                        </div>
                        {data.promotions && <PromotionSection promotions={data.promotions} />}

                        {Object.entries(data?.attributes || {}).filter(
                           ([key, value]) => key !== 'category' && Array.isArray(value) && value?.length > 0,
                        ).length > 0 && (
                           <div className="flex gap-2 border-b-[0.3px] border-gray-400 py-4">
                              {data?.attributes?.colors?.length && (
                                 <Options
                                    title="color"
                                    options={data.attributes.colors}
                                    setSelectedAttributes={setSelectedAttributes}
                                 />
                              )}
                              {data?.attributes?.size?.length && (
                                 <Options
                                    title="size"
                                    options={data.attributes.size}
                                    setSelectedAttributes={setSelectedAttributes}
                                 />
                              )}
                           </div>
                        )}

                        <div className="flex items-center gap-9 border-b-[0.3px] border-gray-400 py-2">
                           <p className="text-[10px]">Sold:&nbsp;{data.ordersCount}</p>
                           <p className="text-[10px]">Viewed:&nbsp;{data.viewed}</p>
                           <div className="flex items-center gap-1 text-[10px]">
                              <p>Rating:</p>
                              <StarRating rating={averageRating(data?.comments)} size="13" />
                           </div>
                        </div>
                        <div className={`mt-6 flex w-full items-center gap-5`}>
                           <Counter count={count} setCount={setCount} />
                           {data.promotions?.discountType === 'buyXgetY' &&
                              data.promotions.isActive &&
                              data.promotions?.buyX &&
                              data.promotions?.getY &&
                              count >= data.promotions?.buyX &&
                              `(+${data.promotions?.getY} free)`}
                           <Btn
                              text={`ADD - $${data.price.toString().startsWith('discount') ? +data.price.toString().split('/')[2] * count : data.price * count}`}
                              ariaLabel="Add Btn"
                              className="w-[300px]"
                              onClick={handleAddToBasket}
                           />
                        </div>
                     </div>
                  </div>
                  <div className="mt-6 flex justify-center">
                     <CommentsHero prodId={id} comments={data?.comments} />
                  </div>
                  <SliderContainer title="liked" text="Your liked  products" />
                  <SliderContainer title="recently" text="Recently products" />
                  <SliderContainer title="related" text="Related products" data={data} />
               </>
            )}
         </div>
      </section>
   )
}

export default ProductDetail
