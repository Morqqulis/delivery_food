import { Types } from 'mongoose'

export interface IChildren {
   children: React.ReactNode
}

export interface IParamsID {
   params: {
      id: string
   }
}
export interface IProductsSection {
   products: IProduct[]
   title: string
}
export interface IDefaultProvider extends IChildren {
   full: boolean
}

export interface IClassName {
   className?: string
}

export interface IBtn extends IClassName {
   type?: HTMLButtonElement['type']
   onClick?: () => void
   ariaLabel: string
   text: string
   children?: React.ReactNode
   href?: string
}

export interface IUser {
   _id: Types.ObjectId
   name: string
   email: string
   password: string
   gender: string
   role?: string
   image?: string
   createdAt?: Date
   basket?: []
}
export interface ISeller {
   _id: Types.ObjectId
   name: string
   secondName: string
   address: string
   phone: string
   email: string
   password: string
   image?: string
   createdAt?: Date
   products?: []
   order?: []
}

export interface IProduct {
   _id: Types.ObjectId
   name: string
   description: string
   price: number
   category: string
   seller: Types.ObjectId
   image?: string
   createdAt?: Date
}

export interface IFormValues {
   email: string
   password: string
   name?: string
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
export interface IOrder {
   _id?: Types.ObjectId
   payment: string
   status: string
   customer: Types.ObjectId
   customerNote?: string
   products: []
   createdAt?: Date
}

export interface IBasket {
   productId: {
      category: string
      _id: string
      createdAt: Date
      description: string
      image: string
      name: string
      price: number
      sellerId: string
      updatedAt: Date
      __v: number
   }
   _id: string
   quantity: number
}
export interface IGroupedProductsOrders {
   sellerId: string
   products: {
      productId: string
      quantity: number
   }[]
}
