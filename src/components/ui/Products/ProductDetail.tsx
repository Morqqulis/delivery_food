'use client'
import { productGetById, productGetByIdWithPopulate } from '#backend/actions/productActions'
import CommentsHero from '#sections/Comments/CommentsHero'
import StarRating from '#sections/Comments/StarRating'
import { IProduct } from '#types/index'
import Counter from '#ui/Counter'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { averageRating } from '../../../functions/helpers'
import Link from 'next/link'
import LikeHeart from '#ui/LikeHeart'
import ProductsSlider from '#ui/Products/ProductsSlider'
import { cookieUpdateRecently } from '#backend/actions/cookieRecently'

interface IProductPage {
   id: string
}

const ProductDetail: React.FC<IProductPage> = ({ id }): JSX.Element => {
   const [product, setProduct] = useState<IProduct>()
   const [count, setCount] = useState(1)

   useEffect(() => {
      if (!id) return
      ;(async () => {
         const prod = await productGetByIdWithPopulate(id, '', 'name secondName')
         setProduct(prod)
         await cookieUpdateRecently(id)
      })()
   }, [id])

   return (
      <section className={`py-20`}>
         <div className="container">
            {product ? (
               <>
                  <div className="flex w-full items-center gap-3 p-5">
                     <div className="relative h-[500px] w-[50%] p-2">
                        <Image
                           src={'/qazan.svg'}
                           width={500}
                           height={500}
                           alt={'product image'}
                           className="h-full w-full"
                        />
                        <LikeHeart id={id} />
                     </div>
                     <div className="flex w-[50%] flex-col p-2">
                        <div className="border-b-[0.3px] border-gray-400 pb-4">
                           <h1 className={`mb-1 text-5xl font-bold text-blue-700`}>{product?.name}</h1>
                           <StarRating rating={averageRating(product?.comments)} size="15" />
                        </div>
                        <div className="border-b-[0.3px] border-gray-400 py-4">
                           <p>{product?.description}</p>
                        </div>
                        <div className="border-b-[0.3px] border-gray-400 py-4">
                           <div className="flex gap-2">
                              <Link href={`/store/${product?.seller?._id}`} className="font-bold">
                                 {product?.seller?.name}
                              </Link>
                              <StarRating rating={4.4} size="10" />
                           </div>
                           <p>{product?.seller?.secondName}</p>
                        </div>
                        <Counter
                           count={count}
                           setCount={setCount}
                           text={`ADD - $ ${product?.price ? (count * product?.price).toFixed(2) : 0}`}
                           id={id}
                           className="mt-6"
                        />
                     </div>
                  </div>
                  <div className="mt-6 flex justify-center">
                     <CommentsHero prodId={id} comments={product?.comments} />
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
               </>
            ) : (
               'Loading...'
            )}
         </div>
      </section>
   )
}

export default ProductDetail
