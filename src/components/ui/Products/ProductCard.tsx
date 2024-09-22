'use client'
import { IProduct } from '#types/index'
import LikeHeart from '#ui/LikeHeart'
import { Glow, GlowCapture } from '@codaworks/react-glow'
import { Eye, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { averageRating, getPrice } from '../../../functions/helpers'
import Counter from '#ui/Counter/Counter'
import Btn from '#ui/Btn/Btn'
import { useBasketStore } from '#stores/basketStore'

const ProductCard = ({ product, className }: { product: IProduct; className?: string }): JSX.Element => {
   const [count, setCount] = useState(1)
   const price = getPrice(product)

   const addToBasket = useBasketStore((state) => state.addToBasket)

   const handleAddToBasket = async () => {
      await addToBasket(product._id.toString(), count, {
         color: product.attributes.colors[0],
         size: product.attributes.size[0],
      })
      setCount(1)
   }

   return (
      <GlowCapture>
         <Glow>
            <Link
               className={`relative flex h-full min-h-[460px] min-w-[260px] grow flex-col items-center justify-items-center gap-2 overflow-hidden rounded-lg border-orange-500/20 bg-[#00070A] px-2 py-4 glow:border glow:border-purple-500 glow:bg-cyan-500/20 glow:shadow glow:shadow-white ${className}`}
               href={`/products/${product._id}`}
            >
               <div className={`flex w-full items-center justify-between gap-2`}>
                  <div className="flex items-center gap-2 text-yellow-600">
                     <Star fill="yellow" size={18} />
                     {averageRating(product.comments)}
                  </div>
                  <div className="flex items-center gap-2 text-[#38a0fa]">
                     <Eye size={18} />
                     {product.viewed}
                  </div>
                  <LikeHeart id={product._id.toString()} />
               </div>

               <Image src={product?.image[0]} width={150} height={150} alt={'product image'} priority />

               <div className={`flex w-full grow flex-col gap-2 text-center glow:text-mini-100`}>
                  <h3 className="text-lg font-bold text-mini-100 msm:text-base">{product.name}</h3>
                  <p className={`text-base mmd:text-sm`}>
                     {product.description.length > 40 ? product.description.slice(0, 40) + '...' : product.description}
                  </p>
               </div>

               <div className="w-full px-2 text-center text-3xl font-bold text-[#82F3FF]">
                  {price?.toString().startsWith('discount') ? (
                     <div className={`grid items-center justify-center gap-2`}>
                        <span className="text-xl text-tomato-200 line-through msm:text-lg">
                           $&nbsp;{price.toString().split('/')[1]}
                        </span>
                        <span className="font-bold">$&nbsp;{price.toString().split('/')[2]}</span>
                     </div>
                  ) : (
                     price
                  )}
               </div>

               <div className={`relative z-[1] flex w-full flex-col items-center justify-between gap-5`}>
                  <Counter count={count} setCount={setCount} />
                  <Btn
                     text={'ADD'}
                     ariaLabel="Add Btn"
                     className="w-full px-5 py-3 mmd:max-w-full"
                     onClick={handleAddToBasket}
                  />
               </div>
            </Link>
         </Glow>
      </GlowCapture>
   )
}

export default ProductCard
