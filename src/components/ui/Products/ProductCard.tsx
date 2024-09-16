'use client'
import { IBasket, IProduct } from '#types/index'
import Counter from '#ui/Counter'
import LikeHeart from '#ui/LikeHeart'
import { Eye, Heart, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { averageRating } from '../../../functions/helpers'
import { GlowCapture, Glow } from '@codaworks/react-glow'

const ProductCard: React.FC<{ product: IProduct }> = ({ product }): JSX.Element => {
   const [count, setCount] = useState(1)

   const getPrice = () => {
      const price = product.promotions
         ? product.promotions.discountType === 'percentage'
            ? product.promotions.discountValue &&
              product.price - (product.price * product.promotions.discountValue) / 100
            : 0
         : product.price
      return price
   }

   return (
      <Glow>
         <Link
            className="glow:border-purple-500 glow:bg-cyan-500/10 relative flex h-[500px] min-h-[300px] flex-col items-center justify-between gap-4 rounded-lg border border-orange-500/20 bg-[#00070A]/10 p-6"
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
               <p className="text-3xl font-bold text-[#82F3FF]">$ {getPrice()}</p>
               <div className="flex items-center gap-2 text-[#38a0fa]">
                  <Eye size={18} />
                  {product.viewed}
               </div>
            </div>

            <Counter
               count={count}
               setCount={setCount}
               text="ADD"
               id={product._id.toString()}
               className="w-full flex-col gap-5 relative z-[1]"
            />
            <LikeHeart id={product._id.toString()} />
         </Link>
      </Glow>
   )
}

export default ProductCard
