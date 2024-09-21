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
         console.log(orders)
         setOrders(orders)
      })()
   }, [])

  

   const tableHeader = ['ID', 'Address', 'Product Names', 'Total Amount', 'Created At', 'Actions']
   const bodys = orders.map((order: ICurrentOrder) => {
      return {
         id: '***' + order._id.toString().slice(order._id.toString().length - 5, order._id.toString().length),
         address: order?.adress,
         name: order.products.map((product) => product.name).join(', '),
         total: `$${calculateTotal(order.products)}`,
         note: order.sellerNote,
         date: hoursSince(order?.createdAt?.toLocaleString() || '') + ' hours ago',
         actions: (
            <>
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
                        <div className="mt-4">
                           <p className="font-bold">Customer Note:</p> {order.sellerNote}
                        </div>
                        <Table
                           headers={['Product Image', 'Product Name', 'Price', 'Sold Price', 'Quantity', 'Attributes']}
                           body={order.products.map((product, index) => {
                              return {
                                 image: `/qazan.svg`,
                                 name: product.name,
                                 price: product.price,
                                 soldPrice: product.soldPrice,
                                 quantity: product.quantity,
                                 attributes: Object.entries(product.selectedAttributes || {})
                                    .map(([key, value]) => {
                                       return `${key}: ${value}`
                                    })
                                    .join(', '),
                              }
                           })}
                           footer={['', '', 'Total Amount:', `$${calculateTotal(order.products)}`, '', '']}
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
