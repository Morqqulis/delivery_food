import React from 'react'
import Image from 'next/image'
import { Pencil } from 'lucide-react'

const products = [
   {
      id: 1,
      name: 'Product 1',
      category: 'Category 1',
      price: '$10.00',
      image: './qazan.svg',
   },
   {
      id: 2,
      name: 'Product 2',
      category: 'Category 2',
      price: '$20.00',
      image: './qazan.svg',
   },
]

const ProductPage: React.FC = () => {
   return (
      <div className="h-screen w-full bg-gray-900 p-6 text-white">
         <h1 className="mb-6 text-3xl font-bold">Your Products</h1>
         <div className="flex gap-6">
            {products.map((product) => (
               <div key={product.id} className="flex items-center justify-center gap-4 rounded-lg bg-gray-800 p-4">
                  <div className="flex-shrink-0">
                     <Image src="/qazan.svg" alt={product.name} width={50} height={50} />
                  </div>
                  <div className="flex-1">
                     <h2 className="text-lg font-semibold">{product.name}</h2>
                     <p className="text-sm">
                        {product.category} - {product.price}
                     </p>
                  </div>
                  <div className="flex items-center">
                     <Pencil className="cursor-pointer text-blue-400 hover:text-blue-500" />
                  </div>
               </div>
            ))}
         </div>
      </div>
   )
}

export default ProductPage
