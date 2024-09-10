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
import { Heart } from 'lucide-react'

interface IProductPage {
   id: string
}

const HomeProductDetails: React.FC<IProductPage> = ({ id }): JSX.Element => {
   const [product, setProduct] = useState<IProduct>()
   const [count, setCount] = useState(1)
   const [like, setLike] = useState(false)
   console.log(product)

   useEffect(() => {
      if (!id) return
      ;(async () => {
         const prod = await productGetByIdWithPopulate(id, '', 'name secondName')
         setProduct(prod)
      })()
   }, [id])

   return (
      <section className={`py-20`}>
         <div className="container">
            {product ? (
               <>
                  <div className="flex w-full items-center gap-3 p-5">
                     <div className="h-[500px] w-[50%] p-2">
                        <Image
                           src={'/qazan.svg'}
                           width={500}
                           height={500}
                           alt={'product image'}
                           className="h-full w-full relative"
                        />
                        <Heart
                           className={`cursor-pointer ${like ? 'fill-red-500' : 'fill-transparent'} absolute right-2 top-2`}
                           onClick={() => setLike(!like)}
                        />
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
                              <Link href={`/seller/${product?.seller?._id}`} className="font-bold">
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
               </>
            ) : (
               'Loading...'
            )}
         </div>
      </section>
   )
}

export default HomeProductDetails
