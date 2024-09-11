'use client'
import { IProduct } from '#types/index'
import Counter from '#ui/Counter'
import LikeHeart from '#ui/LikeHeart'
import { Heart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

interface ProductCardProps {
   product: IProduct
}

const ProductCard: React.FC<ProductCardProps> = ({ product }): JSX.Element => {
   const [count, setCount] = useState(1)

   return (
      <div className="relative flex w-[250px] min-w-[250px] flex-col items-center justify-between gap-4 rounded-lg bg-[#00070A] p-6">
         <Link href={`/products/${product._id}`} className="flex flex-col items-center gap-4">
            <Image src="/qazan.svg" width={150} height={150} alt={'product image'} priority />
            <p className="text-2xl font-bold">{product.name} &gt; </p>
            <p className="text-center">
               {product.description.length > 40 ? product.description.slice(0, 40) + '...' : product.description}
            </p>
            <p className="text-3xl font-bold text-[#82F3FF]">$ {product.price}</p>
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
