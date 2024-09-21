'use server'

import { connectDB } from '#backend/DB'
import pointModel from '#backend/models/pointModel'
import productModel from '#backend/models/productModel'
import promoModel from '#backend/models/promotionModel'
import sellerModel from '#backend/models/sellerModel'
import { IBasket, IComment, IFilter, IProduct, IProductCreate } from '#types/index'
import { Types } from 'mongoose'

export const productGetAll = async () => {
   try {
      await connectDB()
      const products = await productModel.find({ isActive: true }).populate({ path: 'promotions', model: promoModel })

      return JSON.parse(JSON.stringify(products))
   } catch (err: Error | any) {
      throw new Error(err)
   }
}
export const productGetAllPopulate = async () => {
   try {
      await connectDB()
      const products = await productModel.find().populate({ path: 'seller', model: sellerModel })
      return JSON.parse(JSON.stringify(products))
   } catch (err: Error | any) {
      throw new Error(err)
   }
}
export const productGetAllWithPopulateBySelect = async (select: string) => {
   try {
      await connectDB()
      const products = await productModel.find().populate({ path: 'seller', model: sellerModel, select })
      return JSON.parse(JSON.stringify(products))
   } catch (err: Error | any) {
      throw new Error(err)
   }
}

export const productGetById = async (id: string, select?: string) => {
   if (!id) return
   try {
      await connectDB()
      const product = await productModel.findOne({ isActive: true }, select)
      return JSON.parse(JSON.stringify(product))
   } catch (err: Error | any) {
      throw new Error(err)
   }
}
export const productGetByIdWithPopulate = async (id: string, selectProduct: string, selectSeller: string) => {
   if (!id) return
   try {
      await connectDB()
      const product = await productModel
         .findOne({ _id: id }, selectProduct)
         .populate({ path: 'seller', model: sellerModel, select: selectSeller })
         .populate({ path: 'promotions', model: promoModel })
      return JSON.parse(JSON.stringify(product))
   } catch (err: Error | any) {
      throw new Error(err)
   }
}

export const productGetByIdWithPromotion = async (id: string, selectProduct: string) => {
   if (!id) return
   try {
      await connectDB()
      const product = await productModel
         .findOne({ _id: id }, selectProduct)
         .populate({ path: 'promotions', model: promoModel })
      return JSON.parse(JSON.stringify(product))
   } catch (err: Error | any) {
      throw new Error(err)
   }
}

type BasketItem = {
   product: string
   quantity: number
}
export const productsGetByIds = async (items: BasketItem[]) => {
   try {
      await connectDB()
      const productIds = items.map((product) => product.product)
      const products = await productModel
         .find({ _id: { $in: productIds } })
         .populate({ path: 'promotions', model: promoModel })
         .populate({ path: 'seller', model: sellerModel, populate: { path: 'point', model: pointModel } })

      if (products.length === 0) return console.error('Products not found')
      const result = products.map((product) => {
         const item = items.find((item) => item.product === product._id.toString())
         return {
            ...product.toObject(),
            quantity: item?.quantity || 1,
         }
      })
      return JSON.parse(JSON.stringify(result))
   } catch (err) {
      console.error('Məhsulları əldə etmək zamanı xəta baş verdi:', err)
      throw err
   }
}

export const productsGetByIdsEtc = async (ids: string[]) => {
   if (!ids) return
   try {
      await connectDB()
      const products = await productModel
         .find({ _id: { $in: ids } })
         .populate({ path: 'promotions', model: promoModel })
      return JSON.parse(JSON.stringify(products))
   } catch (err: Error | any) {
      throw new Error(err)
   }
}

export const productDeleteById = async (id: string, sellerId: string) => {
   if (!id) return
   try {
      await connectDB()
      await sellerModel.updateOne(
         { _id: sellerId },
         {
            $pull: { products: new Types.ObjectId(id) },
         },
      )
      await productModel.deleteOne({ _id: id })
      return 'Product deleted successfully'
   } catch (err: Error | any) {
      throw new Error(err)
   }
}

export const productDeleteAll = async () => {
   try {
      await connectDB()
      await productModel.deleteMany({})
      return 'All products deleted successfully'
   } catch (err: Error | any) {
      throw new Error(err)
   }
}

export const productUpdateById = async (id: string, data: any) => {
   if (!id || !data) return

   try {
      await connectDB()
      await productModel.updateOne({ _id: id }, data)
      return 'Product updated successfully'
   } catch (err: Error | any) {
      throw new Error(err)
   }
}

export const productCreate = async (data: IProductCreate) => {
   if (!data) return

   try {
      await connectDB()
      const product = await productModel.create(data)
      await sellerModel.updateOne({ _id: data.seller }, { $push: { products: product._id } })
      return JSON.parse(JSON.stringify(product))
   } catch (err: Error | any) {
      throw new Error(err)
   }
}

export const productsGetByFilters = async (filters: IFilter) => {
   if (!filters) return
   try {
      await connectDB()

      const query = Object.entries({
         promotions: filters.promotion ? { $ne: null } : undefined,
         'attributes.size': filters.size ? { $in: filters.size } : undefined,
         'attributes.colors': filters.color ? { $in: filters.color } : undefined,
         'attributes.category.main': filters.category?.main ? { $in: filters.category.main } : undefined,
         'attributes.category.sub': filters.category?.sub ? { $in: filters.category.sub } : undefined,
         'attributes.category.child': filters.category?.child ? { $in: filters.category.child } : undefined,
         price:
            filters?.price?.min || filters?.price?.max
               ? {
                    ...(filters.price.min && { $gte: filters.price.min }),
                    ...(filters.price.max && { $lte: filters.price.max }),
                 }
               : undefined,
      }).reduce((acc, [key, value]) => {
         if (value !== undefined) acc[key] = value
         return acc
      }, {} as any)

      const products = await productModel.find(query).populate({ path: 'promotions', model: promoModel })

      return JSON.parse(JSON.stringify(products))
   } catch (err: Error | any) {
      throw new Error(err)
   }
}

export const productsGetByParams = async (params: any) => {
   if (!params) return
   try {
      await connectDB()
      const products = await productModel.find(params)
      return JSON.parse(JSON.stringify(products))
   } catch (err: Error | any) {
      throw new Error(err)
   }
}

export const productsNameQuery = async (query: string) => {
   if (!query) return
   try {
      await connectDB()
      const regex = new RegExp(query, 'i')
      const data = await productModel.find({ name: { $regex: regex } })
      return JSON.parse(JSON.stringify(data))
   } catch (err: Error | any) {
      throw new Error(err)
   }
}

export const productAddComment = async (id: string, data: IComment) => {
   if (!id || !data) return
   try {
      await connectDB()

      await productModel.updateOne({ _id: id }, { $push: { comments: data } })
      return 'comment added'
   } catch (error: Error | any) {}
}

export const productRelatedNameAndCategory = async (currentProduct: IProduct) => {
   if (!currentProduct) return
   try {
      await connectDB()
      const nameKeywords = currentProduct.name.split(' ')
      const products = await productModel
         .find({
            _id: { $ne: currentProduct._id },
            $or: [
               ...nameKeywords.map((keyword) => ({ name: { $regex: keyword, $options: 'i' } })),
               { 'attributes.category.main': currentProduct.attributes.category.main },
               { 'attributes.category.sub': currentProduct.attributes.category.sub },
               { 'attributes.category.child': currentProduct.attributes.category.child },
            ],
         })
         .populate({ path: 'promotions', model: promoModel })
         .limit(20)

      return JSON.parse(JSON.stringify(products))
   } catch (error: Error | any) {
      throw new Error(error)
   }
}
