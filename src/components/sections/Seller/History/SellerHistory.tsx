'use client'
import { sellerOrdersNotIncludes } from '#backend/actions/sellerActions'
import Table from '#sections/Table'
import { IOrderHistory } from '#types/index'
import React, { useEffect, useState } from 'react'

const SellerHistory: React.FC = () => {
   const [orders, setOrders] = useState<IOrderHistory[]>([])

   useEffect(() => {
      ;(async () => {
         const orders = await sellerOrdersNotIncludes('66d02490d14d9bc8e4366bd1', 'pending')
         setOrders(orders)
      })()
   }, [])

   const header = ['Products', 'Total', 'Payment', 'Status', 'Date']
   const tableBody = orders.map((order) => [
      order.products.map((product) => product.product.name + '*' + product.quantity).join(', '),
      `$${order.products.reduce((crr, product) => crr + product.product.price * product.quantity, 0)}`,
      order.payment,
      order.status,
      order.createdAt.toLocaleString(),
   ])

   const footer = [
      `Total Orders: ${orders.length}`,
      '',
      '',
      'Total Revenue:',
      `$${orders.reduce((acc, order) => acc + order.products.reduce((crr, product) => crr + product.product.price * product.quantity, 0), 0).toFixed(2)}`,
   ]

   return (
      <div className="flex flex-col p-6">
         <h2 className="mb-4 text-2xl font-bold text-white">Order History</h2>
         <Table header={header} body={tableBody} footer={footer} />
      </div>
   )
}

export default SellerHistory
