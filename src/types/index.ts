import { Types } from 'mongoose'

export interface IChildren {
   children: React.ReactNode
}

export interface IParamsID {
   params: {
      id: string
   }
}

export interface IDefaultProvider extends IChildren {
   full: boolean
}

export interface IClassName {
   className?: string
}

export interface IBtn extends React.ButtonHTMLAttributes<HTMLButtonElement> {
   onClick?: () => void | Promise<void> | any
   ariaLabel?: string
   text: string
   children?: React.ReactNode
   href?: string
}
export interface IAddComment {
   name: string
   text: string
}
export interface IComment {
   name: string
   text: string
   rating: number
   date: Date
}
export interface IProduct {
   _id: Types.ObjectId
   name: string
   description: string
   price: number
   comments?: IComment[]
   category: string
   seller: Types.ObjectId
   image?: string
   createdAt?: Date
}
export interface ISeller {
   _id?: Types.ObjectId
   point: string
   name: string
   secondName: string
   address: string
   phone: string
   email: string
   password: string
   image?: string
   createdAt?: Date
   products?: IProduct[]
   order?: []
}
export interface IFormValues {
   email: string
   password: string
   firstName?: string
   gender?: string
}

export interface IStoreFormValues {
   name: string
   secondName: string
   address: string
   phone: string
   email: string
   image: string
}
export interface IAddProduct {
   name: string
   description: string
   price: number
   category: string
   image?: any
}

export interface IUser {
   _id?: Types.ObjectId
   name: string
   email: string
   password?: string
   gender?: string
   role?: string
   image?: string
   createdAt?: Date
   phone?: string
   address?: string
}

export interface ICheckoutForm {
   fullName: string
   phone: string
   city: string
   deliveryType: string
   street: string
   sellerNote?: string
   village: string
   deliveryNote?: string
}

export interface IOrderItem {
   product: IProduct
   quantity: Number
   accepted: Boolean
   point: Types.ObjectId
}
export interface IOrder {
   _id: Types.ObjectId
   status: string
   customer: IUser
   city: string
   products: IOrderItem[]
   sellerNote?: string
   createdAt?: Date
   deliveryType: string
   adress: string
   deliveryNote?: string
}

export interface IPoint {
   _id?: Types.ObjectId
   name: string
   address: string
   phone: string
   orders: IOrder[]

   createdAt?: Date
}

export interface IOrderHistory {
   _id: string
   products: { product: IProduct; quantity: number }[]
   createdAt: string
   customerNote?: string
   payment: string
   status: string
}

export interface IBasket {
   category: string
   _id: string
   createdAt: Date
   description: string
   image: string
   name: string
   price: number
   seller: string
   updatedAt: Date
   quantity: number
   __v: number
}
export interface IBasketItem {
   product: string
   quantity: number
}
export interface IGroupedProductsOrders {
   sellerId: string
   products: {
      productId: string
      quantity: number
   }[]
}

export interface IGoogleResponseUser {
   email: string
   image: string
   name: string
}

export interface IBasketStore {
   basket: IBasket[]
   fetchBasket: () => Promise<void>
   addToBasket: (productId: string, quantity: number) => Promise<void>
   removeFromBasket: (productId: string) => Promise<void>
   clearBasket: () => void
}

export interface IDeliveryStore {
   point: IPoint
   fetchPoint: () => Promise<void>
   updateProductAcceptStatus: (orderId: Types.ObjectId, productId: Types.ObjectId) => Promise<void>
   updateOrderStatus: (orderId: Types.ObjectId, status: string) => Promise<void>
}
export interface ISessionStore {
   session: any
   checkSession: () => void
}


