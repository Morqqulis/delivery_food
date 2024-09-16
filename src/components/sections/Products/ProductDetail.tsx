'use client'
import { productGetById, productGetByIdWithPopulate, productUpdateById } from '#backend/actions/productActions'
import CommentsHero from '#sections/Comments/CommentsHero'
import StarRating from '#sections/Comments/StarRating'
import { IProduct, ISelectedAttributes } from '#types/index'
import Counter from '#ui/Counter'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { averageRating, getPrice } from '../../../functions/helpers'
import Link from 'next/link'
import LikeHeart from '#ui/LikeHeart'
import ProductsSlider from '#ui/Products/ProductsSlider'
import { cookieUpdateRecently } from '#backend/actions/cookieRecently'
import { ordersFindWithProduct } from '#backend/actions/orderAction'

import Options from './Options'
import { useQuery } from '@tanstack/react-query'
import ProductBread from './ProductBread'

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

   return (
      <section className={`py-20`}>
         <div className="container">
            {isLoading && <p>Loading...</p>}
            {isError && <p>Error</p>}
            {data && (
               <>
                  <ProductBread data={data} />
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
                        <div className="flex gap-2 border-b-[0.3px] border-gray-400 py-4">
                           <Options
                              title="color"
                              options={data.attributes.colors}
                              setSelectedAttributes={setSelectedAttributes}
                           />
                           <Options
                              title="size"
                              options={data.attributes.size}
                              setSelectedAttributes={setSelectedAttributes}
                           />
                        </div>

                        <div className="flex items-center gap-9 border-b-[0.3px] border-gray-400 py-2">
                           <p className="text-[10px]">Sold:&nbsp;{data.ordersCount}</p>
                           <p className="text-[10px]">Viewed:&nbsp;{data.viewed}</p>
                           <div className="flex items-center gap-1 text-[10px]">
                              <p>Rating:</p>
                              <StarRating rating={averageRating(data?.comments)} size="13" />
                           </div>
                        </div>
                        <Counter
                           count={count}
                           setCount={setCount}
                           selectedAttributes={selectedAttributes}
                           text={`ADD - $${data.price.toString().startsWith('discount') ? +data.price.toString().split('/')[2] * count : data.price * count}`}
                           id={id}
                           className="mt-6 w-[300px]"
                        />
                     </div>
                  </div>
                  <div className="mt-6 flex justify-center">
                     <CommentsHero prodId={id} comments={data?.comments} />
                  </div>
                  <div className="mt-6 flex flex-col items-center gap-5">
                     <div className="relative flex h-[50px] w-full items-center justify-center">
                        <div className="h-1 w-full bg-white"></div>
                        <div className="absolute left-[50%] translate-x-[-50%] bg-dark-400 px-5 text-center text-5xl">
                           Your liked products
                        </div>
                     </div>
                     <ProductsSlider title="liked" />
                  </div>

                  <div className="mt-6 flex flex-col items-center gap-5">
                     <div className="relative flex h-[50px] w-full items-center justify-center">
                        <div className="h-1 w-full bg-white"></div>
                        <div className="absolute left-[50%] translate-x-[-50%] bg-dark-400 px-5 text-center text-5xl">
                           Recently products
                        </div>
                     </div>
                     <ProductsSlider title="recently" />
                  </div>

                  <div className="mt-6 flex flex-col items-center gap-5">
                     <div className="relative flex h-[50px] w-full items-center justify-center">
                        <div className="h-1 w-full bg-white"></div>
                        <div className="absolute left-[50%] translate-x-[-50%] bg-dark-400 px-5 text-center text-5xl">
                           Related products
                        </div>
                     </div>
                     <ProductsSlider title="related" product={data} />
                  </div>
               </>
            )}
         </div>
      </section>
   )
}

export default ProductDetail
