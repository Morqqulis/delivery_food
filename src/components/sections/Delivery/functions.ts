import { orderUpdateStatus, updateProductAcceptedStatus } from '#backend/actions/orderAction'
import { IOrder, IPoint, IProduct } from '#types/index'
import { Types } from 'mongoose'
import { Dispatch, SetStateAction } from 'react'

export const updateProductAcceptStatus = async (
   orderId: Types.ObjectId,
   productId: Types.ObjectId,
   setFilteredOrder: Dispatch<SetStateAction<(IOrder & { products: { product: IProduct; accepted: boolean }[] })[]>>,
   setPoint: Dispatch<SetStateAction<IPoint>>,
) => {
   await updateProductAcceptedStatus(orderId, productId, true)
   setFilteredOrder((prev) =>
      prev.map((order) =>
         order._id === orderId
            ? {
                 ...order,
                 products: order.products.map((product) =>
                    product.product._id === productId ? { ...product, accepted: true } : product,
                 ),
              }
            : order,
      ),
   )
   setPoint((prev) => ({
      ...prev,
      orders: prev.orders.map((order) =>
         order._id === orderId
            ? {
                 ...order,
                 products: order.products.map((product) =>
                    product.product._id === productId ? { ...product, accepted: true } : product,
                 ),
              }
            : order,
      ),
   }))
}

export const updateOrderStatus = async (
   orderId: Types.ObjectId,
   status: string,
   setFilteredOrder: Dispatch<SetStateAction<(IOrder & { products: { product: IProduct; accepted: boolean }[] })[]>>,
   setPoint: Dispatch<SetStateAction<IPoint>>,
) => {
   await orderUpdateStatus(orderId, status)
   setFilteredOrder((prev) => prev.map((order) => (order._id === orderId ? { ...order, status: status } : order)))
   setPoint((prev) => ({
      ...prev,
      orders: prev.orders.map((order) => (order._id === orderId ? { ...order, status: status } : order)),
   }))
}
