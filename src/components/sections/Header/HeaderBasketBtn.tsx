'use client'

import { orderGet } from '#backend/actions/orderAction'
import { pointCreate, pointGetByIdWithPopulate, pointGetOne } from '#backend/actions/pointActions'
import { productGetByIdWithPopulate } from '#backend/actions/productActions'
import { sellerCreate, sellerGetByIdWithPopulate, sellerGetByIdWithSelect } from '#backend/actions/sellerActions'
import { useBasketStore } from '#stores/basketStore'
import Btn from '#ui/Btn/Btn'
import { useEffect } from 'react'

const HeaderBasketBtn: React.FC = (): JSX.Element => {
   const { basket, fetchBasket } = useBasketStore()

   useEffect(() => {
      fetchBasket()
      ;(async () => {
         // const data = {
         //    name: 'salam 2',
         //    address: 'baku 2',
         //    phone: '4488444',
         //    orders: [],
         // }
         // const seller = {
         //    point: '66dab6c6a3465f7246890205',
         //    name: 'Seller 3',
         //    secondName: 'Second 3',
         //    address: 'Address 3',
         //    phone: '333333333',
         //    email: 'exapmle3@ex.com',
         //    password: 'salam',
         // }
         // console.log(await sellerCreate(seller))
         // console.log(await pointGetOne('66dabc6d7.3d03776b3e92c94', ''))
         console.log(await orderGet("66db073578b5326c6ec90ced"))
         console.log(await pointGetByIdWithPopulate('66dabc6d73d03776b3e92c94'))

         // console.log(await sellerGetByIdWithPopulate('66d024b4d14d9bc8e4366bd2', 'point'))
         // console.log(await pointCreate(data))
         // console.log(await sellerGetByIdWithSelect('66d024b4d14d9bc8e4366bd2', 'point products'))
         // const {
         //    seller: { point },
         // } = await productGetByIdWithPopulate('66d025381e1e1a184cc0b811', 'seller', 'point')
         // console.log(point)
      })()
   }, [])

   return (
      <Btn
         className={`px-11 py-2`}
         text={`Orders (${basket.length})`}
         type={'button'}
         ariaLabel={'Orders Btn'}
         href="/basket"
      />
   )
}

export default HeaderBasketBtn
