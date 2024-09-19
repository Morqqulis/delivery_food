'use client'
import React, { useEffect, useState } from 'react'
import { Trash, Eye, Check } from 'lucide-react'
import { sellerGetAllOrders } from '#backend/actions/sellerActions'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '#ui/dialog'
import { IOrder, IOrderItem, IOrderItemProducts, IProduct, ISelectedAttributes } from '#types/index'
import { orderUpdateStatus } from '#backend/actions/orderAction'
import { calculateTotal, getPrice, getTotal, hoursSince } from '../../../../functions/helpers'
import Table from '#ui/Table/Table'
import { Types } from 'mongoose'
import { productGetAll, productGetById, productUpdateById } from '#backend/actions/productActions'
import productModel from '#backend/models/productModel'

interface ICurrentOrder extends IOrder {
   products: IOrderItemProducts[]
}

const SellerOrders: React.FC = () => {
   const [orders, setOrders] = useState<ICurrentOrder[]>([])

   useEffect(() => {
      ;(async () => {
         const orders = await sellerGetAllOrders('66d02490d14d9bc8e4366bd1', 'pending')
         setOrders(orders)
      })()
   }, [])

   // const handleAcceptOrder = async (orderId: Types.ObjectId) => {
   //    await orderUpdateStatus(orderId, 'accepted')
   //    setOrders(orders.filter((order) => order._id != orderId))
   // }

   // const handleRejectOrder = async (orderId: Types.ObjectId) => {
   //    await orderUpdateStatus(orderId, 'rejected')
   //    setOrders(orders.filter((order) => order._id != orderId))
   // }

   const tableHeader = ['ID', 'Product Names', 'Total Amount', 'Customer Note', 'Created At', 'Actions']
   const bodys = orders.map((order: ICurrentOrder) => {
      return {
         id: '***' + order._id.toString().slice(order._id.toString().length - 5, order._id.toString().length),
         name: order.products.map((product) => product.name).join(', '),
         total: `$${calculateTotal(order.products)}`,
         note: order.sellerNote,
         date: hoursSince(order?.createdAt?.toLocaleString() || '') + ' hours ago',
         actions: (
            <>
               {/* <button
                  onClick={() => handleAcceptOrder(order._id)}
                  className="mr-2 text-green-500 hover:text-green-700"
               >
                  <Check size={20} />
               </button>
               <button onClick={() => handleRejectOrder(order._id)} className="mr-2 text-red-500 hover:text-red-700">
                  <Trash size={20} />
               </button> */}
               <Dialog>
                  <DialogTrigger>
                     <Eye size={20} />
                  </DialogTrigger>
                  <DialogContent className="min-w-[80%] bg-gray-800">
                     <DialogHeader>
                        <DialogTitle>Order Details</DialogTitle>
                        <DialogDescription>
                           The orders need to be handed over to the courier as soon as possible
                        </DialogDescription>
                        <Table
                           headers={['Product Image', 'Product Name', 'Price', 'Quantity', 'Attributes']}
                           body={order.products.map((product, index) => {
                              return {
                                 image: `/qazan.svg`,
                                 name: product.name,
                                 price: `$${getPrice(product)}`,
                                 quantity: product.quantity,
                                 attributes: Object.entries(product.selectedAttributes || {})
                                    .map(([key, value]) => {
                                       return `${key}: ${value}`
                                    })
                                    .join(', '),
                              }
                           })}
                           footer={['', '', 'Total Amount:', `$${calculateTotal(order.products)}`]}
                        />
                     </DialogHeader>
                  </DialogContent>
               </Dialog>
            </>
         ),
      }
   })
   return (
      <div className="p-6">
         <h1 className="mb-6 text-2xl font-bold">Active Orders</h1>
         <Table headers={tableHeader} body={bodys} />
      </div>
   )
}

export default SellerOrders
