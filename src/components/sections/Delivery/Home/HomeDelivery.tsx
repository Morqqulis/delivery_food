'use client'
import { pointGetByIdWithPopulate, pointGetOne } from '#backend/actions/pointActions'
import { IPoint } from '#types/index'
import { useEffect, useState } from 'react'
import DeliveryAside from '../Aside/DeliveryAside'

const HomeDelivery: React.FC = (): JSX.Element => {
   const [point, setPoint] = useState({} as IPoint)
   useEffect(() => {
      ;(async () => {
         const point = await pointGetByIdWithPopulate('66dab6c6a3465f7246890205')
         console.log(point)
         setPoint(point)
      })()
   }, [])
   return (
      <div className="flex w-full gap-2">
         <div className="w-[20%]">
            <DeliveryAside pointInfo={point} />
         </div>
         <div className="w-[80%]">sakam</div>
      </div>
   )
}

export default HomeDelivery
