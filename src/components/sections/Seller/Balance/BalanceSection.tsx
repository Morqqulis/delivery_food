'use client'
import { sellerGetAllOrders } from '#backend/actions/sellerActions'
import { IOrder } from '#types/index'
import { useEffect, useState } from 'react'

const BalanceSection: React.FC = (): JSX.Element => {
   const [orders, setOrders] = useState<IOrder[]>([])

   useEffect(() => {
      ;(async () => {
         const orders = await sellerGetAllOrders('66d02490d14d9bc8e4366bd1', 'completed')
         setOrders(orders)

         console.log('geldi:', orders)
      })()
   }, [])
   return <div>BalanceSection</div>
}

export default BalanceSection
