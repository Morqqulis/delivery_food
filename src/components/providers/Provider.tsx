import { IChildren } from '#/types/interfaces'

const Provider: React.FC<IChildren> = ({ children }: IChildren): JSX.Element => {
   return <>{children}</>
}

export default Provider
