'use client'
import { productGetById } from '#backend/actions/productActions'
import Counter from '#ui/Counter'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface IProductPage {
   id: any
}

const HomeProductDetails: React.FC<IProductPage> = ({ id }): JSX.Element => {
   const [product, setProduct] = useState<any>()
   const [count, setCount] = useState(1)

   useEffect(() => {
      if (!id) return
      ;(async () => {
         const prod = await productGetById(id, '')
         setProduct(prod)
      })()
   }, [id])

   return (
      <section className={`py-20`}>
         <div className="container">
            <h1 className={`mb-10 text-center text-5xl`}>{product?.name}</h1>
            <div className="flex w-full items-center gap-10">
               <div className="">
                  <Image src={'/qazan.svg'} width={300} height={300} alt={'product image'} />
               </div>
               <div className="flex flex-col gap-6">
                  <p>{product?.name}</p>
                  <p>{product?.description}</p>
                  <Counter
                     count={count}
                     setCount={setCount}
                     text={`ADD - $ ${product?.price ? (count * product?.price).toFixed(2) : 0}`}
                     id={id}
                     className="mt-6"
                  />
               </div>
            </div>
         </div>
      </section>
   )
}

export default HomeProductDetails
