'use server'

import { connectDB } from '#backend/DB'
import orderModel from '#backend/models/orderModel'
import pointModel from '#backend/models/pointModel'
import product from '#backend/models/productModel'
import { IOrder, IOrderItem, IPoint } from '#types/index'
import { Types } from 'mongoose'

export const pointCreate = async (data: IPoint) => {
   try {
      await connectDB()
      const point = await pointModel.create(data)
      return JSON.parse(JSON.stringify(point))
   } catch (err: Error | any) {
      throw new Error(err)
   }
}

export const pointGetOne = async (id: string, select: string) => {
   try {
      await connectDB()
      const point = await pointModel.findOne({ _id: id }, select)
      return JSON.parse(JSON.stringify(point))
   } catch (err: Error | any) {
      throw new Error(err)
   }
}

export const pointGetAllOrders = async (pointId: string) => {
   if (!pointId) return
   try {
      await connectDB()

      const point = await pointModel.findById(pointId)
      if (!point) return

      const orders = await orderModel.aggregate([
         {
            $addFields: {
               sellers: {
                  $filter: {
                     input: '$sellers',
                     as: 'seller',
                     cond: { $eq: ['$$seller.point', new Types.ObjectId(pointId)] },
                  },
               },
            },
         },

         {
            $match: {
               'sellers.0': { $exists: true },
            },
         },

         {
            $addFields: {
               products: {
                  $filter: {
                     input: '$products',
                     as: 'product',
                     cond: {
                        $eq: ['$$product.point', new Types.ObjectId(pointId)],
                     },
                  },
               },
            },
         },
         {
            $match: {
               'products.0': { $exists: true },
            },
         },
         {
            $lookup: {
               from: 'products', 
               localField: 'products.product',
               foreignField: '_id',
               as: 'productDetails',
            },
         },         
         {
            $addFields: {
               products: {
                  $map: {
                     input: '$products',
                     as: 'p',
                     in: {
                        product: {
                           $arrayElemAt: [
                              {
                                 $filter: {
                                    input: '$productDetails',
                                    as: 'detail',
                                    cond: { $eq: ['$$detail._id', '$$p.product'] },
                                 },
                              },
                              0,
                           ],
                        },

                        quantity: '$$p.quantity',
                        price: '$$p.price',
                        promotions: '$$p.promotions',
                        accepted: '$$p.accepted',
                        point: '$$p.point',
                        selectedAttributes: '$$p.selectedAttributes',
                     },
                  },
               },
            },
         },

         {
            $group: {
               _id: '$_id',
               adress: { $first: '$adress' },
               deliveryNote: { $first: '$deliveryNote' },
               deliveryType: { $first: '$deliveryType' },
               createdAt: { $first: '$createdAt' },
               updatedAt: { $first: '$updatedAt' },
               customer: { $first: '$customerDetails' },
               sellerNote: { $first: '$sellerNote' },
               status: { $first: '$status' },
               sellers: { $first: '$sellers' },
               products: { $first: '$products' },
            },
         },
      ])

      return { ...JSON.parse(JSON.stringify(point)), orders: JSON.parse(JSON.stringify(orders)) }
   } catch (error: any) {
      throw new Error('Error retrieving orders by point: ' + error.message)
   }
}
