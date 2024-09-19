'use client'
import { IOrder, IPoint, IProduct } from '#types/index'
import { useEffect, useState } from 'react'
import { pointGetAllOrders } from '#backend/actions/pointActions'
import TableSection from './TableSection'
import Filters from './Filters'

const HomeDelivery: React.FC = (): JSX.Element => {
   const [point, setPoint] = useState({} as IPoint)
   const [filteredOrders, setFilteredOrder] = useState<
      (IOrder & { products: { product: IProduct; accepted: boolean }[] })[]
   >([])

   useEffect(() => {
      ;(async () => {
         const pointdata = await pointGetAllOrders('66dab6c6a3465f7246890205')
         setPoint(pointdata)
         setFilteredOrder(pointdata.orders)
      })()
   }, [])

   return (
      <div className="flex w-full p-4">
         <div className="w-full ">
            <Filters setFilteredOrder={setFilteredOrder} orders={point.orders} />
            <TableSection orders={filteredOrders} setFilteredOrder={setFilteredOrder} setPoint={setPoint} />
         </div>
      </div>
   )
}

export default HomeDelivery
