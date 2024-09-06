'use client'
import { pointGetOne } from '#backend/actions/pointActions'
import { IPoint } from '#types/index'
import { useEffect, useState } from 'react'
import DeliveryAside from '../Aside/DeliveryAside'

const HomeDelivery: React.FC = (): JSX.Element => {
   const [point, setPoint] = useState({} as IPoint)
   useEffect(() => {
      ;(async () => {
         const point = await pointGetOne('66d9a12c937030602ae87d80')
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
