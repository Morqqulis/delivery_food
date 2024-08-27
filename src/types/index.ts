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
   _id: object
   name: string
   email: string
   password: string
   gender?: string
   role?: string
   image?: string
   createdAt?: Date
   basket: []
}

export interface IProduct {
   _id: object
   name: string
   description: string
   price: number
   category: string
   ingredients: string[] | string
   image?: string
   createdAt?: Date
   basket: []
}

export interface FormValues {
   email: string
   password: string
   name?: string
   gender?: string
}
