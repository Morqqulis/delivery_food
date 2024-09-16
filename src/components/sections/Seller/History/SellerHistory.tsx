'use client'
import { sellerOrdersNotIncludes } from '#backend/actions/sellerActions'
import { IOrderHistory } from '#types/index'
import Table from '#ui/Table/Table'
import React, { useEffect, useState } from 'react'

const SellerHistory: React.FC = () => {
   const [orders, setOrders] = useState<IOrderHistory[]>([])

   useEffect(() => {
      ;(async () => {
         const orders = await sellerOrdersNotIncludes('66d02490d14d9bc8e4366bd1', 'pending')
         setOrders(orders)
      })()
   }, [])

   const header = ['ID', 'Products', 'Total', 'Status', 'Date']
   const tableBody = orders.map((order) => {
      return {
         id: '***' + order._id.toString().slice(order._id.toString().length - 5, order._id.toString().length),
         name: order.products.map((product) => product.product.name + '*' + product.quantity).join(', '),
         total: `$${order.products.reduce((crr, product) => crr + product.product.price * product.quantity, 0)}`,
         status: order.status,
         date: order.createdAt.toLocaleString().slice(0, 10),
      }
   })

   const footer = [
      `Total Orders: ${orders.length}`,
      '',
      'Total Revenue:',
      `$${orders.reduce((acc, order) => acc + order.products.reduce((crr, product) => crr + product.product.price * product.quantity, 0), 0).toFixed(2)}`,
   ]

   return (
      <div className="flex flex-col p-6">
         <h2 className="mb-4 text-2xl font-bold text-white">Order History</h2>
         <Table headers={header} body={tableBody} footer={footer} />
      </div>
   )
}

export default SellerHistory
