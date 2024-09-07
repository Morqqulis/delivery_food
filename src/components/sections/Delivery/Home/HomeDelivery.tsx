'use client'
import { pointGetByIdWithPopulate, pointGetOne } from '#backend/actions/pointActions'
import { IBasket, IOrder, IPoint, IProduct } from '#types/index'
import { useEffect, useState } from 'react'
import DeliveryAside from '../Aside/DeliveryAside'
import { orderGetAll } from '#backend/actions/orderAction'
import Table from '#ui/Table/Table'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '#ui/dialog'
import { Check } from 'lucide-react'

const HomeDelivery: React.FC = (): JSX.Element => {
   const [point, setPoint] = useState({} as IPoint)
   useEffect(() => {
      ;(async () => {
         await orderGetAll()
         const point = await pointGetByIdWithPopulate('66dab6c6a3465f7246890205')
         console.log(point)
         setPoint(point)
      })()
   }, [])
   const header = ['ID', 'Address', 'Status', 'Date', 'Note', 'Type', 'Customer', 'Action']
   const body = point?.orders?.map((item) => {
      const {
         order: { adress, createdAt, customer, deliveryNote, deliveryType, status, _id },
         products,
      } = item

      const dialogBody = products.map((product: IBasket) => {
         return {
            name: product.product.name,
            count: product.quantity,
            accept: <Check className="cursor-pointer text-green-700" onClick={() => console.log(product.product._id)} />,
         }
      })

      return {
         id: '***' + _id.toString().slice(_id.toString().length - 5, _id.toString().length),
         adress,
         status,
         date: createdAt.toLocaleString().slice(0, 10),
         deliveryNote,
         deliveryType,
         customer,
         action: (
            <Dialog>
               <DialogTrigger>Bax</DialogTrigger>
               <DialogContent className="min-w-[80%] bg-gray-800">
                  <DialogHeader>
                     <DialogTitle></DialogTitle>
                     <DialogDescription>Məhsulları quşlamaq üçün dialog</DialogDescription>
                     <Table headers={['Name', 'Count', 'Accept']} body={dialogBody} />
                  </DialogHeader>
               </DialogContent>
            </Dialog>
         ),
      }
   })
   return (
      <div className="flex w-full gap-2">
         <div className="w-[20%]">
            <DeliveryAside pointInfo={point} />
         </div>
         <div className="w-[80%]">
            <Table headers={header} body={body} />
         </div>
      </div>
   )
}

export default HomeDelivery
