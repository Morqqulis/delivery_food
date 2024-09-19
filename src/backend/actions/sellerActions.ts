'use server'
import { connectDB } from '#backend/DB'
import orderModel from '#backend/models/orderModel'
import productModel from '#backend/models/productModel'
import promoModel from '#backend/models/promotionModel'
import sellerModel from '#backend/models/sellerModel'
import ProductDetail from '#sections/Products/ProductDetail'
import { ISeller } from '#types/index'
import { Types } from 'mongoose'

export const sellerCreate = async (data: ISeller) => {
   if (!data) return

   try {
      await connectDB()
      await sellerModel.create(data)
      return 'Seller created successfully'
   } catch (err: Error | any) {
      throw new Error(err)
   }
}

export const sellerGetAll = async () => {
   try {
      await connectDB()
      const sellers = await sellerModel.find()
      return JSON.parse(JSON.stringify(sellers))
   } catch (err: Error | any) {
      throw new Error(err)
   }
}

export const sellerGetById = async (id: string) => {
   if (!id) return
   try {
      await connectDB()
      const seller = await sellerModel.findOne({ _id: id })
      return JSON.parse(JSON.stringify(seller))
   } catch (err: Error | any) {
      throw new Error(err)
   }
}

export const sellerGetByIdWithSelect = async (id: string, select: string) => {
   if (!id) return
   try {
      await connectDB()
      const seller = await sellerModel.findOne({ _id: id }, select)
      return JSON.parse(JSON.stringify(seller))
   } catch (err: Error | any) {
      throw new Error(err)
   }
}
export const sellerGetByIdPopulateProducts = async (id: string) => {
   if (!id) return
   try {
      await connectDB()
      const seller = await sellerModel.findOne({ _id: id }).populate({ path: 'products', model: productModel })
      return JSON.parse(JSON.stringify(seller))
   } catch (err: Error | any) {
      throw new Error(err)
   }
}
export const sellerGetProductsWithSelect = async (id: string, select: string) => {
   if (!id) return
   try {
      await connectDB()
      const products = await sellerModel.findOne({ _id: id }, 'products').populate('products', select)
      return JSON.parse(JSON.stringify(products))
   } catch (err: Error | any) {
      throw new Error(err)
   }
}

export const sellerDelete = async (id: string) => {
   if (!id) return
   try {
      await connectDB()
      await sellerModel.deleteOne({ _id: id })
      return 'Deleted successfully'
   } catch (err: Error | any) {
      throw new Error(err)
   }
}

export const sellerUpdate = async (id: string, data: any) => {
   if (!id) return

   try {
      await connectDB()
      await sellerModel.updateOne({ _id: id }, data).lean()
      return 'Updated successfully'
   } catch (err: Error | any) {
      throw new Error(err)
   }
}

// { $ne: status }

export const sellerGetAllOrders = async (sellerId: string, status: string) => {
   if (!sellerId) return
   try {
      await connectDB()

      const orders = await orderModel.aggregate([
         { $match: { status: status } },
         { $unwind: '$sellers' },
         {
            $lookup: {
               from: 'sellers',
               localField: 'sellers.seller',
               foreignField: '_id',
               as: 'sellerDetails',
            },
         },
         { $unwind: '$sellerDetails' },

         {
            $match: {
               'sellerDetails._id': new Types.ObjectId(sellerId),
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
            $lookup: {
               from: 'promotions',
               localField: 'productDetails.promotions',
               foreignField: '_id',
               as: 'promotionDetails',
            },
         },

         {
            $addFields: {
               products: {
                  $map: {
                     input: '$products',
                     as: 'product',
                     in: {
                        $mergeObjects: [
                           '$$product',
                           {
                              $arrayElemAt: [
                                 {
                                    $filter: {
                                       input: '$productDetails',
                                       as: 'detail',
                                       cond: {
                                          $eq: ['$$detail._id', '$$product.product'],
                                       },
                                    },
                                 },
                                 0,
                              ],
                           },
                           {
                              promotions: {
                                 $cond: {
                                    if: { $gt: [{ $size: '$promotionDetails' }, 0] },
                                    then: { $arrayElemAt: ['$promotionDetails', 0] },
                                    else: null,
                                 },
                              },
                           },
                        ],
                     },
                  },
               },
            },
         },

         { $unwind: '$products' },

         {
            $match: {
               'products.seller': new Types.ObjectId(sellerId),
            },
         },

         {
            $group: {
               adress: { $first: '$adress' },
               deliveryNote: { $first: '$deliveryNote' },
               deliveryType: { $first: '$deliveryType' },
               createdAt: { $first: '$createdAt' },
               updatedAt: { $first: '$updatedAt' },
               customer: { $first: '$customer' },
               sellerNote: { $first: '$sellerNote' },
               _id: '$_id',
               status: { $first: '$status' },
               sellers: { $first: '$sellers' },
               products: { $push: '$products' },
               sellerDetails: { $first: '$sellerDetails' },
            },
         },
      ])
      return JSON.parse(JSON.stringify(orders))
   } catch (error: any) {
      throw new Error('Error retrieving orders by seller: ' + error.message)
   }
}
