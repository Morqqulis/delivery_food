import { orderGetAll, orderUpdateStatus, updateProductAcceptedStatus } from '#backend/actions/orderAction'
import { pointGetAllOrders } from '#backend/actions/pointActions'
import { IDeliveryStore, IPoint } from '#types/index'
import { Types } from 'mongoose'
import { create } from 'zustand'

export const useDeliveryStore = create<IDeliveryStore>((set) => ({
   point: {} as IPoint,
   fetchPoint: async () => {
      try {
         const pointdata = await pointGetAllOrders('66dab6c6a3465f7246890205')
         set({ point: pointdata })
      } catch (error) {
         console.log('Error in fetchPoint at useDeliveryStore: ', error)
      }
   },

   updateProductAcceptStatus: async (orderId: Types.ObjectId, productId: Types.ObjectId) => {
      await updateProductAcceptedStatus(orderId, productId, true)
      set((state) => ({
         point: {
            ...state.point,
            orders: state.point.orders.map((order) =>
               order._id === orderId
                  ? {
                       ...order,
                       products: order.products.map((product) =>
                          product.product._id === productId ? { ...product, accepted: true } : product,
                       ),
                    }
                  : order,
            ),
         },
      }))
   },

   updateOrderStatus: async (orderId: Types.ObjectId, status: string) => {
      await orderUpdateStatus(orderId, status)
      set((state) => ({
         point: {
            ...state.point,
            orders: state.point.orders.map((order) =>
               order._id === orderId
                  ? {
                       ...order,
                       status: status,
                    }
                  : order,
            ),
         },
      }))
   },
}))
