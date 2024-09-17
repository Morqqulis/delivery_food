'use client'
import { orderGetWithUserId } from '#backend/actions/orderAction'
import { userGetByEmail } from '#backend/actions/userActions'
import { IOrder } from '#types/index'
import Table from '#ui/Table/Table'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { dateFormatter } from '../../../functions/helpers'

interface IOrdersWrapper {}

const OrdersWrapper = () => {
   const session = useSession()

   const { data, isLoading, isError } = useQuery({
      queryKey: ['get client orders'],
      queryFn: async () => {
         if (!session.data?.user?.email) return
         const { _id } = await userGetByEmail(session.data.user.email, '_id')
         const orders = await orderGetWithUserId(_id)
         return orders
      },
      enabled: !!session.data?.user?.email,

      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: true,

      staleTime: 1000 * 60 * 60, // 1 Saat
   })
   console.log(data)
   const header = ['ID', 'Date', 'Delivery Note', 'Seller Note', 'Delivery Type', 'Products', 'Status']
   const body = data?.map((order: IOrder) => {
      return {
         id: '***' + order._id.toString().slice(order._id.toString().length - 5, order._id.toString().length),
         date: dateFormatter(order.createdAt),
         deliveryNote: order.deliveryNote,
         sellerNote: order.sellerNote,
         deliveryType: order.deliveryType,
         products: order.products
            .map(
               (product) =>
                  product?.product.name +
                  ' * ' +
                  product?.quantity +
                  'pcs' +
                  ' * ' +
                  Object.entries(product?.selectedAttributes || {}).map(([key, value]) => `${key}: ${value}`),
            )
            .join(', '),
         status: order.status,
      }
   })

   return (
      <div>
         {isLoading && <div>Loading...</div>}
         {isError && <div>Error</div>}
         {data && (
            <div>
               <Table headers={header} body={body} />
            </div>
         )}
      </div>
   )
}

export default OrdersWrapper
