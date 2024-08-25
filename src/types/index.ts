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

export interface IAuthLogin {
   email: string
   password: string
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
   _id: string
   name: string
   email: string
   password: string
   gender?: string
   role?: string
   image?: string
   createdAt?: Date
}

export interface IProduct {
   _id: string
   name: string
   description: string
   price: number
   category: string
   ingredients: string[] | string
   image?: string
   createdAt?: Date
}

export interface IAuthRegister {
   email: string
   password: string
   name: string
   gender: string
}
