'use client'
import React, { useEffect, useState } from 'react'
import { Trash, Eye, Check } from 'lucide-react'
import Table from '#sections/Table'
import Image from 'next/image'
import { sellerGetFilteredOrders } from '#backend/actions/sellerActions'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '#ui/dialog'
import { IProduct } from '#types/index'
import { orderUpdateStatus } from '#backend/actions/orderAction'

interface Order {
   _id: string
   products: { product: IProduct; quantity: number }[]
   createdAt: string
   customerNote?: string
   payment: string
}

const SellerOrders: React.FC = () => {
   const [orders, setOrders] = useState<Order[]>([])

   useEffect(() => {
      ;(async () => {
         const orders = await sellerGetFilteredOrders('66d02490d14d9bc8e4366bd1', 'pending')
         setOrders(orders)
      })()
   }, [])

   const handleAcceptOrder = async (orderId: string) => {
      await orderUpdateStatus(orderId, 'accepted')
      setOrders(orders.filter((order) => order._id != orderId))
   }

   const handleRejectOrder = async (orderId: string) => {
      await orderUpdateStatus(orderId, 'rejected')
      setOrders(orders.filter((order) => order._id != orderId))
   }

   const tableHeader = ['Product Names', 'Total Amount', 'Created At', 'Actions']

   const tableBody = orders.map((order) => [
      order.products.map((product) => product?.product.name).join(', '),
      `$${order.products.reduce((crr, product) => crr + product.product.price * product.quantity, 0)}`,
      order.createdAt.toLocaleString(),
      <>
         <button onClick={() => handleAcceptOrder(order._id)} className="mr-2 text-green-500 hover:text-green-700">
            <Check size={20} />
         </button>
         <button onClick={() => handleRejectOrder(order._id)} className="mr-2 text-red-500 hover:text-red-700">
            <Trash size={20} />
         </button>
         <Dialog>
            <DialogTrigger>
               <Eye size={20} />
            </DialogTrigger>
            <DialogContent className="bg-gray-800">
               <DialogHeader>
                  <DialogTitle>Order Details</DialogTitle>
                  <DialogDescription>
                     <Table
                        header={['Product Image', 'Product Name', 'Price', 'Quantity']}
                        // @ts-ignore
                        body={order.products.map((product, index) => [
                           <Image
                              key={'product' + index}
                              src={`/qazan.svg`}
                              alt={product.product.name}
                              width={30}
                              height={30}
                           />,
                           product.product.name,
                           `$${product.product.price}`,
                           product.quantity,
                        ])}
                        footer={[
                           'Total Amount:',
                           '',
                           '',
                           `$${order.products.reduce((crr, product) => crr + product.product.price * product.quantity, 0)}`,
                        ]}
                     />
                  </DialogDescription>
               </DialogHeader>
            </DialogContent>
         </Dialog>
      </>,
   ])

   return (
      <div className="p-6">
         <h1 className="mb-6 text-2xl font-bold">Active Orders</h1>
         <Table header={tableHeader} body={tableBody} />
      </div>
   )
}

export default SellerOrders
