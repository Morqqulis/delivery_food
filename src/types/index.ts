export interface IChildren {
   children: React.ReactNode
}

export interface IDefaultProvider extends IChildren {
   full: boolean
}

export interface IAuthLogin {
   email: string
   password: string
}

export interface IAuthRegister {
   email: string
   password: string
   name: string
   gender: string
}