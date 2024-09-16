'use client'
import { IProduct } from '#types/index'
import Counter from '#ui/Counter'
import LikeHeart from '#ui/LikeHeart'
import { Glow } from '@codaworks/react-glow'
import { Eye, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { averageRating, getPrice } from '../../../functions/helpers'

const ProductCard = ({ product }: { product: IProduct }): JSX.Element => {
   const [count, setCount] = useState(1)
   const price = getPrice(product)

   return (
      <Glow>
         <Link
            className="relative flex h-[500px] flex-col items-center justify-between gap-4 rounded-lg border-orange-500/20 bg-[#00070A] p-6 glow:border glow:border-purple-500 glow:bg-cyan-500/20 glow:shadow glow:shadow-white"
            href={`/products/${product._id}`}
         >
            <Image src={`${product?.image}`} width={150} height={150} alt={'product image'} priority />

            <div className={`glow:text-mini-100`}>
               <p className="text-2xl font-bold">{product.name} &gt; </p>
               <p className="text-center">
                  {product.description.length > 40 ? product.description.slice(0, 40) + '...' : product.description}
               </p>
            </div>

            <div className="flex w-full justify-between px-2">
               <div className="flex items-center gap-2 text-yellow-600">
                  <Star fill="yellow" size={18} />
                  {averageRating(product.comments)}
               </div>

               <p className="text-3xl font-bold text-[#82F3FF]">
                  $&nbsp;
                  {price?.toString().startsWith('discount') ? (
                     <>
                        <span className="text-2xl line-through">{price.toString().split('/')[1]}</span>&nbsp;
                        <span className="text-3xl font-bold">{price.toString().split('/')[2]}</span>
                     </>
                  ) : (
                     price
                  )}
               </p>
               <div className="flex items-center gap-2 text-[#38a0fa]">
                  <Eye size={18} />
                  {product.viewed}
               </div>
            </div>

            <Counter
               selectedAttributes={{
                  color: product.attributes.colors[0],
                  size: product.attributes.size[0],
               }}
               count={count}
               setCount={setCount}
               text="ADD"
               id={product._id.toString()}
               className="relative z-[1] w-full flex-col gap-5"
            />
            <LikeHeart id={product._id.toString()} />
         </Link>
      </Glow>
   )
}

export default ProductCard
