'use client'
import { IOrder, IOrderItem, IOrderItemProducts, IProduct } from '#types/index'
import DeliveryAside from '../Aside/DeliveryAside'
import Table from '#ui/Table/Table'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '#ui/dialog'
import { Check } from 'lucide-react'
import { useDeliveryStore } from '#stores/deliveryStore'
import Btn from '#ui/Btn/Btn'
import { pointGetAllOrders } from '#backend/actions/pointActions'
import { useEffect, useState } from 'react'
import { Types } from 'mongoose'

const HomeDelivery: React.FC = (): JSX.Element => {
   const { point, updateProductAcceptStatus, updateOrderStatus } = useDeliveryStore()
   // const [filteredOrders, setFilteredOrder] = useState<
   //    (IOrder & { products: { product: IProduct; accepted: boolean }[] })[]
   // >([])

   // useEffect(() => {
   //    setFilteredOrder(point?.orders || [])
   // }, [point])


   const body = point?.orders?.map((item: IOrder & { products: { accepted: boolean }[] }) => {
      const { adress, createdAt, products, customer, deliveryNote, deliveryType, status, _id } = item
      const dialogBody = products.map((prod: any) => {
         const { product, quantity, accepted } = prod
         return {
            name: product.name,
            count: quantity,
            accept: accepted ? (
               'Accepted'
            ) : (
               <Check
                  className="cursor-pointer text-green-700"
                  onClick={() => updateProductAcceptStatus(_id, product._id)}
               />
            ),
         }
      })

      const acceptedProducts = products.every((product) => product.accepted)

      return {
         id: '***' + _id?.toString().slice(_id.toString().length - 5, _id.toString().length),
         adress,
         status,
         date: createdAt?.toLocaleString().slice(0, 10),
         deliveryNote,
         deliveryType,
         customer: customer?.name,
         action: (
            <Dialog>
               {status !== 'accepted' ? (
                  <DialogTrigger className="font-bold text-green-700">
                     {acceptedProducts ? 'Check order status' : 'Check product status'}
                  </DialogTrigger>
               ) : (
                  'Order Accepted'
               )}
               <DialogContent className="min-w-[80%] bg-gray-800">
                  <DialogHeader>
                     <DialogTitle></DialogTitle>
                     <DialogDescription>Məhsulları quşlamaq üçün dialog</DialogDescription>
                     <Table headers={['Name', 'Count', 'Accept']} body={dialogBody} />
                     {acceptedProducts && (
                        <div className="flex justify-end">
                           {status !== 'accepted' ? (
                              <Btn
                                 text={'Check order status'}
                                 type={'button'}
                                 ariaLabel={'Check order status'}
                                 onClick={() => updateOrderStatus(_id, 'accepted')}
                              />
                           ) : (
                              'Order Accepted'
                           )}
                        </div>
                     )}
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
            <Table headers={['ID', 'Address', 'Status', 'Date', 'Note', 'Type', 'Customer', 'Action']} body={body} />
         </div>
      </div>
   )
}

export default HomeDelivery
