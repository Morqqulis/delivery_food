'use client'

import { useBasketStore } from '#stores/basketStore'
import Btn from '#ui/Btn/Btn'
import { useEffect } from 'react'

const HeaderBasketBtn: React.FC = (): JSX.Element => {
   const { basket, fetchBasket } = useBasketStore()

   useEffect(() => {
      fetchBasket()
   }, [])

   return (
      <Btn
         className={`px-11 py-2`}
         text={`Basket (${basket?.length})`}
         type={'button'}
         ariaLabel={'Basket Btn'}
         href="/basket"
      />
   )
}

export default HeaderBasketBtn
