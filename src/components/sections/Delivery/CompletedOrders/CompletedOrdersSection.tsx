'use client'
import { useDeliveryStore } from '#stores/deliveryStore'
import { IOrder, IOrderItem } from '#types/index'
import { Check } from 'lucide-react'
import DeliveryAside from '../Aside/DeliveryAside'
import Table from '#ui/Table/Table'
import { useToast } from '#ui/use-toast'

interface ICompletedOrdersSection {}

const CompletedOrdersSection: React.FC = (): JSX.Element => {
   const { point } = useDeliveryStore()
   const { toast } = useToast()

   const header = ['ID', 'Address', 'Status', 'Date', 'Note', 'Type', 'Customer', 'Action']
   const body = point?.orders?.map((item: IOrder) => {
      const { adress, createdAt, customer, deliveryNote, deliveryType, status, _id } = item
      return (
         status === 'accepted' && {
            id: '***' + _id?.toString().slice(_id.toString().length - 5, _id.toString().length),
            adress,
            status,
            date: createdAt?.toLocaleString().slice(0, 10),
            deliveryNote,
            deliveryType,
            customer: customer?.name,
            action: (
               <p
                  className="cursor-pointer font-bold text-green-700"
                  onClick={() =>
                     toast({
                        title: 'Success',
                        description: ` Order No. ${_id?.toString().slice(_id.toString().length - 5, _id.toString().length)} was sent to ${customer?.name}`,
                        variant: 'succesfull',
                     })
                  }
               >
                  Send
               </p>
            ),
         }
      )
   })
   return (
      <div className="flex w-full gap-2">
         <div className="w-[20%]">
            <DeliveryAside pointInfo={point} />
         </div>
         <div className="w-[80%]">
            {body?.length && body[0] ? (
               <Table headers={header} body={body} />
            ) : (
               <p className="flex h-full w-full items-center justify-center font-bold">No completed orders</p>
            )}
         </div>
      </div>
   )
}

export default CompletedOrdersSection
