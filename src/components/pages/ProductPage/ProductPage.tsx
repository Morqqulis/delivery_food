'use client'
import {
   productCreate,
   productData,
   productDeleteById,
   productGetAll,
   productGetByCategory,
   productGetById,
   productsGetByParams,
   productUpdateById,
} from '#backend/actions/productActions'
import { userCreate, userDeleteById, userGetAll, userGetById, userUpdateById } from '#backend/actions/userActions'
import Counter from '#sections/Counter'
import { IProduct } from '#types/index'
import Btn from '#ui/Btn/Btn'
import axios from 'axios'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface IProductPage {
   id: string
}

const ProductPage: React.FC<IProductPage> = ({ id }): JSX.Element => {
   const [product, setProduct] = useState<IProduct>()
   const [count, setCount] = useState(1)

   useEffect(() => {
      if (!id) return
      ;(async () => {
         const prod = await productData(id)
         setProduct(prod)

        //  const data = {
        //     name: 'yeni product',
        //     description: 'yeni product 6666',
        //     price: 55.55,
        //     category: 'yeni',
        //     ingredients: [],
        //  }
         //  console.log(await productUpdateById(id, { price: 55.44 }))
         //   console.log(await productCreate(data));
         //  console.log(await productGetByCategory('yeniler'));
         //  console.log(await productDeleteById(id));
         //  console.log(await productGetAll())
        //  console.log(await productsGetByParams({ name: 'yeni product', category: 'yeni' }))

         //  console.log(await userCreate({ _id: '3535', name: 'qazan', email: 'qazan@qazan.com', password: 'salam' }))
         // console.log(await userUpdateById('3535', {  name: 'bayram'}))
         // console.log(await userDeleteById('3535'));
         //  console.log(await userGetById('3535'))
         //  console.log(await userGetAll())
      })()
   }, [id])

   //   useEffect(() => {
   //      ;(async () => {
   //         const response = await axios.get(`/api/products/${id}`, { params: { id } })
   //         console.log(response.data)
   //      })()
   //   }, [id])

   return (
      <div className="container flex w-full items-center gap-10">
         <div className="">
            <Image src={'/qazan.svg'} width={300} height={300} alt={'product image'} />
         </div>
         <div className="flex flex-col gap-6">
            <p>{product?.name}</p>
            <p>{product?.description}</p>
            <div className="mt-6 flex items-center justify-between gap-2">
               <Counter count={count} setCount={setCount} />
               <Btn
                  text={`ADD - $ ${product?.price ? count * product?.price : 0}`}
                  ariaLabel="Add Btn"
                  className="px-5 py-3"
               />
            </div>
         </div>
      </div>
   )
}

export default ProductPage
