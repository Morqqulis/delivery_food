import Btn from '#ui/Btn/Btn'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '#ui/dialog'
import Table from '#ui/Table/Table'
import { Dispatch, SetStateAction } from 'react'
import { updateOrderStatus } from './functions'
import { IOrder, IPoint, IProduct } from '#types/index'
import { Types } from 'mongoose'

interface IDialogSection {
   id: Types.ObjectId
   status: string
   acceptedProducts: boolean
   dialogBody: any
   setFilteredOrder: Dispatch<SetStateAction<(IOrder & { products: { product: IProduct; accepted: boolean }[] })[]>>
   setPoint: Dispatch<SetStateAction<IPoint>>
}

const DialogSection: React.FC<IDialogSection> = ({
   id,
   status,
   acceptedProducts,
   dialogBody,
   setFilteredOrder,
   setPoint,
}): JSX.Element => {
   return (
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
                           onClick={() => updateOrderStatus(id, 'accepted', setFilteredOrder, setPoint)}
                        />
                     ) : (
                        'Order Accepted'
                     )}
                  </div>
               )}
            </DialogHeader>
         </DialogContent>
      </Dialog>
   )
}

export default DialogSection
