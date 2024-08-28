'use client'
import React, { useState } from 'react'
import { Pencil, Trash, Eye, Check } from 'lucide-react'
import Table from '#sections/Table'
import Image from 'next/image'

interface Order {
   id: string
   products: { name: string; price: number; quantity: number; image?: string }[]
   totalAmount: number
   createdAt: string
   customerNote?: string
}

const SellerOrders: React.FC = () => {
   const [orders, setOrders] = useState<Order[]>([
      {
         id: '1',
         products: [
            { name: 'Product 1', price: 20, quantity: 2, image: '/qazan.svg' },
            { name: 'Product 2', price: 15, quantity: 1, image: '/qazan.svg' },
         ],
         totalAmount: 55,
         createdAt: '25.08.99',
         customerNote: 'Please deliver before 6 PM',
      },
      {
         id: '2',
         products: [
            { name: 'Product 1', price: 20, quantity: 2, image: '/qazan.svg' },
            { name: 'Product 2', price: 15, quantity: 1, image: '/qazan.svg' },
            { name: 'Product 2', price: 15, quantity: 1, image: '/qazan.svg' },
            { name: 'Product 2', price: 15, quantity: 1, image: '/qazan.svg' },
            { name: 'Product 2', price: 15, quantity: 1, image: '/qazan.svg' },
            { name: 'Product 2', price: 15, quantity: 1, image: '/qazan.svg' },
          
         ],
         totalAmount: 55,
         createdAt: '25.08.89',
         customerNote: 'Please deliver before 6 PM',
      },
   ])

   const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
   const [isModalOpen, setModalOpen] = useState(false)

   const handleViewDetails = (order: Order) => {
      setSelectedOrder(order)
      setModalOpen(true)
   }

   const handleAcceptOrder = (orderId: string) => {
      console.log(`Order ${orderId} accepted`)
   }

   const handleRejectOrder = (orderId: string) => {
      console.log(`Order ${orderId} rejected`)
   }

   const closeModal = () => {
      setModalOpen(false)
      setSelectedOrder(null)
   }

   const tableHeader = ['Product Names', 'Total Amount', 'Created At', 'Actions']

   const tableBody = orders.map((order) => [
      order.products.map((product) => product.name).join(', '),
      `$${order.totalAmount.toFixed(2)}`,
      order.createdAt.toLocaleString(),
      <>
         <button onClick={() => handleAcceptOrder(order.id)} className="mr-2 text-green-500 hover:text-green-700">
            <Check size={20} />
         </button>
         <button onClick={() => handleRejectOrder(order.id)} className="mr-2 text-red-500 hover:text-red-700">
            <Trash size={20} />
         </button>
         <button onClick={() => handleViewDetails(order)} className="text-blue-500 hover:text-blue-700">
            <Eye size={20} />
         </button>
      </>,
   ])

   return (
      <div className="p-6">
         <h1 className="mb-6 text-2xl font-bold">Active Orders</h1>
         <Table header={tableHeader} body={tableBody} />

         {isModalOpen && selectedOrder && (
            <div className="fixed inset-0 z-50 flex w-full items-center justify-center bg-black bg-opacity-50">
               <div className="w-[60%] rounded-lg bg-gray-800 p-6 shadow-lg">
                  <h2 className="mb-4 text-xl font-bold">Order Details</h2>
                  <Table
                     header={['Product Image', 'Product Name', 'Price', 'Quantity']}
                     body={selectedOrder.products.map((product, index) => [
                        <Image
                           key={product.name + index}
                           src={`${product.image}`}
                           alt={product.name}
                           width={30}
                           height={30}
                        />,
                        product.name,
                        `$${product.price.toFixed(2)}`,
                        product.quantity.toString(),
                     ])}
                     footer={["Total Amount:","","",`$${selectedOrder.totalAmount.toFixed(2)}`]}
                  />
                  <p className="mt-4 text-sm text-white">Customer Note: {selectedOrder.customerNote}</p>
                  <button onClick={closeModal} className="mt-4 rounded bg-blue-500 px-4 py-2 text-white">
                     Close
                  </button>
               </div>
            </div>
         )}
      </div>
   )
}

export default SellerOrders
