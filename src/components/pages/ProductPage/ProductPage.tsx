'use client'
import {
   basketGetAll,
   basketGetOne,
   basketGetUserId,
   basketCreateOrUpdate,
   basketDeleteProduct,
} from '#backend/actions/basketActions'
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
   const [product, setProduct] = useState<any>()
   const [count, setCount] = useState(1)

   useEffect(() => {
      if (!id) return
      ;(async () => {
         const prod = await productData(id)
         setProduct(prod)

         // const mongoose = require('mongoose')

         // console.log(await basketGetUserId('66cc1dd356e909720e7b292d'))

         // const data = {
         //    _id: new mongoose.Types.ObjectId().toString(),
         //    name: 'yeni mehsul 5',
         //    description: 'yeni 5',
         //    price: 55.55,
         //    category: 'yeni',
         //    ingredients: [],
         // }
         // const user = { _id: new mongoose.Types.ObjectId().toString(), name: 'yeni user 1', email: 'sil@yeni.com', password: 'salam' }

         //  console.log(await productUpdateById(id, { price: 55.44 }))
         // console.log(await productCreate(data))
         //  console.log(await productGetByCategory('yeniler'));
         //  console.log(await productDeleteById(id));
         //  console.log(await productGetAll())
         //  console.log(await productsGetByParams({ name: 'yeni product', category: 'yeni' }))

         // console.log(await userCreate(user))
         // console.log(await userUpdateById('3535', {  name: 'bayram'}))
         // console.log(await userDeleteById('3535'));
         //  console.log(await userGetById('3535'))
         //  console.log(await userGetAll())
      })()
   }, [id])

   return (
      <div className="container flex w-full items-center gap-10">
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
   )
}

export default ProductPage
