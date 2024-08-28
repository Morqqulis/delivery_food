import Table from '#sections/Table'
import React from 'react'

interface OrderItem {
   name: string
   quantity: number
   price: number
}

interface Order {
   id: string
   items: OrderItem[]
   customerNote: string
   total: number
}

const SellerHistory: React.FC = () => {
   const orders = [
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
   ]
   const header = ['Products', 'Customer Note', 'Total']
   const body = orders.map((order) => {
      const products = order.products.map((item) => `${item.name} (x${item.quantity})`).join(', ')
      return [products, order.customerNote, `$${order.totalAmount.toFixed(2)}`]
   })

   const footer = [
      `Total Orders: ${orders.length}`,
      'Total Revenue:',
      ` $${orders.reduce((acc, order) => acc + order.totalAmount, 0).toFixed(2)}`,
   ]

   return (
      <div className="flex flex-col p-6">
         <h2 className="mb-4 text-2xl font-bold text-white">Order History</h2>
         <Table header={header} body={body} footer={footer} />
      </div>
   )
}

export default SellerHistory
