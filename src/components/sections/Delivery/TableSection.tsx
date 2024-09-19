import { IOrder, IPoint, IProduct } from '#types/index'
import Btn from '#ui/Btn/Btn'
import Table from '#ui/Table/Table'
import { Check } from 'lucide-react'
import { updateProductAcceptStatus } from './functions'
import DialogSection from './DialogSection'
import { Dispatch, SetStateAction } from 'react'

interface ITableSection {
   setFilteredOrder: Dispatch<SetStateAction<(IOrder & { products: { product: IProduct; accepted: boolean }[] })[]>>
   setPoint: Dispatch<SetStateAction<IPoint>>
   orders: (IOrder & { products: { product: IProduct; accepted: boolean }[] })[]
}

const TableSection: React.FC<ITableSection> = ({ orders, setFilteredOrder, setPoint }): JSX.Element => {
   const body = orders?.map((item: IOrder & { products: { accepted: boolean }[] }) => {
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
                  onClick={() => updateProductAcceptStatus(_id, product._id, setFilteredOrder, setPoint)}
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
            <DialogSection
               id={_id}
               status={status}
               acceptedProducts={acceptedProducts}
               dialogBody={dialogBody}
               setFilteredOrder={setFilteredOrder}
               setPoint={setPoint}
            />
         ),
      }
   })
   return <Table headers={['ID', 'Address', 'Status', 'Date', 'Note', 'Type', 'Customer', 'Action']} body={body} />
}

export default TableSection
