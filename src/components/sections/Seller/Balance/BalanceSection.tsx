'use client'
import { sellerGetAllOrders } from '#backend/actions/sellerActions'
import { IOrderSeller, IOrder, IOrderItemProducts } from '#types/index'
import Table from '#ui/Table/Table'
import { useEffect, useState } from 'react'

interface IBalance extends IOrder {
   products: IOrderItemProducts[]
   sellers: IOrderSeller
}
const BalanceSection: React.FC = (): JSX.Element => {
   const [orders, setOrders] = useState<IBalance[]>([])

   useEffect(() => {
      ;(async () => {
         const orders = await sellerGetAllOrders('66d02490d14d9bc8e4366bd1', 'pending')
         setOrders(orders)

         console.log('geldi:', orders)
      })()
   }, [])

   const unPaidAmount = orders.reduce((acc, curr) => {
      if (curr.sellers.payment?.toString() === 'false') {
         return acc + curr.sellers.amount
      } else {
         return acc
      }
   }, 0)
   const paidAmount = orders.reduce((acc, curr) => {
      if (curr.sellers.payment?.toString() === 'true') {
         return acc + curr.sellers.amount
      } else {
         return acc
      }
   }, 0)

   const header = ['ID', 'Products', 'Total', 'Status', 'Date', 'Payment']
   const body = orders.map((order) => {
      return {
         id: '***' + order._id.toString().slice(order._id.toString().length - 5, order._id.toString().length),
         prods: order.products
            .map((product) => product.name + '-' + product.quantity + '*' + product.soldPrice)
            .join(', '),
         total: order.sellers.amount.toFixed(2),
         status: order.status,
         date: order?.createdAt?.toLocaleString().slice(0, 10),
         payment: order?.sellers.payment?.toString() === 'true' ? 'Paid' : 'Not Paid',
      }
   })
   const footer = ['', 'Total Unpaid:', unPaidAmount.toFixed(2), 'Total Paid:', paidAmount.toFixed(2)]

   return (
      <div>
         <Table headers={header} body={body} footer={footer} />
      </div>
   )
}

export default BalanceSection
