'use client'
import { sellerGetAllOrders } from '#backend/actions/sellerActions'
import { I0rderSeller, IOrder, IOrderHistory, IOrderItemProducts } from '#types/index'
import Table from '#ui/Table/Table'
import React, { useEffect, useState } from 'react'
import { calculateTotal, getTotal } from '../../../../functions/helpers'

interface ICurrentOrder extends IOrder {
   products: IOrderItemProducts[]
   sellers: I0rderSeller
}
const SellerHistory: React.FC = () => {
   const [orders, setOrders] = useState<ICurrentOrder[]>([])

   useEffect(() => {
      ;(async () => {
         const orders = await sellerGetAllOrders('66d02490d14d9bc8e4366bd1', 'pending', false)
         setOrders(orders)
      })()
   }, [])

   const header = ['ID', 'Products', 'Total', 'Status', 'Date', 'Address', 'Note', 'Payment']
   const tableBody = orders.map((order) => {
      return {
         id: '***' + order._id.toString().slice(order._id.toString().length - 5, order._id.toString().length),
         name: order.products
            .map((product) => product.name + '-' + product.quantity + '*' + product.soldPrice)
            .join(', '),
         total: order.sellers.amount.toFixed(2),
         status: order.status,
         date: order?.createdAt?.toLocaleString().slice(0, 10),
         adress: order?.adress,
         note: order?.sellerNote,
         payment: order?.sellers.payment?.toString() === 'true' ? 'Paid' : 'Not Paid',
      }
   })

   const footer = [
      `Total Orders: ${orders.length}`,
      '',
      'Total Revenue:',
      `$${orders.reduce((acc, order) => acc + order.products.reduce((crr, product) => crr + product.price * product.quantity, 0), 0).toFixed(2)}`,
      , '', '', '', ''
   ]

   return (
      <div className="flex flex-col p-6">
         <h2 className="mb-4 text-2xl font-bold text-white">Order History</h2>
         <Table headers={header} body={tableBody} footer={footer} />
      </div>
   )
}

export default SellerHistory
