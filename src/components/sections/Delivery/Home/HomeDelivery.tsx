'use client'
import { IOrder, IOrderItem } from '#types/index'
import DeliveryAside from '../Aside/DeliveryAside'
import Table from '#ui/Table/Table'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '#ui/dialog'
import { Check } from 'lucide-react'
import { useDeliveryStore } from '#stores/deliveryStore'
import Btn from '#ui/Btn/Btn'

const HomeDelivery: React.FC = (): JSX.Element => {
   const { point, updateProductAcceptStatus, updateOrderStatus } = useDeliveryStore()

   const header = ['ID', 'Address', 'Status', 'Date', 'Note', 'Type', 'Customer', 'Action']
   const body = point?.orders?.map((item: IOrder) => {
      const { adress, createdAt, products, customer, deliveryNote, deliveryType, status, _id } = item
      const dialogBody = products.map((product: IOrderItem) => {
         return {
            name: product.product.name,
            count: product.quantity,
            accept: product.accepted ? (
               'Accepted'
            ) : (
               <Check
                  className="cursor-pointer text-green-700"
                  onClick={() => updateProductAcceptStatus(_id, product.product._id)}
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
         customer,
         action: (
            <Dialog>
               <DialogTrigger className="font-bold text-green-700">
                  {acceptedProducts ? 'Check order status' : 'Check product status'}
               </DialogTrigger>
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
            <Table headers={header} body={body} />
         </div>
      </div>
   )
}

export default HomeDelivery
