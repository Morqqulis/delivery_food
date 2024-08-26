'use client'
import { basketCreateOrUpdate } from '#backend/actions/basketActions'
import Counter from '#sections/Counter'
import { IProduct } from '#types/index'
import Btn from '#ui/Btn/Btn'
import { Heart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

interface ProductCardProps {
   product: IProduct
}

const ProductCard: React.FC<ProductCardProps> = ({ product }): JSX.Element => {
   const [count, setCount] = useState(1)
   const [like, setLike] = useState(false)



   return (
      <div className="relative flex w-[250px] flex-col items-center gap-4 rounded-lg bg-[#00070A] p-6">
         <Link href={`/${product._id}`} className="flex flex-col items-center gap-4">
            <Image src="./qazan.svg" width={150} height={150} alt={'product image'} priority />
            <p className="text-2xl font-bold">{product.name} &gt; </p>
            <p className="text-center">{product.description}</p>
            <p className="text-3xl font-bold text-[#82F3FF]">$ {product.price}</p>
         </Link>
         <Counter count={count} setCount={setCount} text="ADD" id={product._id} className="w-[80%]" />
         <Heart
            className={`cursor-pointer ${like ? 'fill-red-500' : 'fill-transparent'} absolute right-2 top-2`}
            onClick={() => setLike(!like)}
         />
      </div>
   )
}

export default ProductCard
