'use client'
import { IBasket, IProduct } from '#types/index'
import Counter from '#ui/Counter'
import LikeHeart from '#ui/LikeHeart'
import { Eye, Heart, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { averageRating, getPrice } from '../../../functions/helpers'

const ProductCard: React.FC<{ product: IProduct }> = ({ product }): JSX.Element => {
   const [count, setCount] = useState(1)
   const price = getPrice(product)

   return (
      <div className="relative flex h-fit w-[250px] min-w-[250px] flex-col items-center justify-between gap-4 rounded-lg bg-[#00070A] p-6">
         <Link href={`/products/${product._id}`} className="flex flex-col items-center gap-4">
            <Image src={`${product?.image}`} width={150} height={150} alt={'product image'} priority />
            <p className="text-2xl font-bold">{product.name} &gt; </p>
            <p className="text-center">
               {product.description.length > 40 ? product.description.slice(0, 40) + '...' : product.description}
            </p>
            <p className="text-3xl font-bold text-[#82F3FF]">
               $&nbsp;
               {price?.toString().startsWith('discount') ? (
                  <>
                     <span className="line-through">{price.toString().split('/')[1]}</span>&nbsp;
                     <span className="font-bold">{price.toString().split('/')[2]}</span>
                  </>
               ) : (
                  price
               )}
            </p>
            <div className="flex w-full justify-between px-2">
               <div className="flex items-center gap-2 text-yellow-600">
                  <Star fill="yellow" size={18} />
                  {averageRating(product.comments)}
               </div>
               <div className="flex items-center gap-2 text-[#38a0fa]">
                  <Eye size={18} />
                  {product.viewed}
               </div>
            </div>
         </Link>
         <Counter
            count={count}
            setCount={setCount}
            text="ADD"
            id={product._id.toString()}
            className="w-full flex-col gap-5"
         />
         <LikeHeart id={product._id.toString()} />
      </div>
   )
}

export default ProductCard
