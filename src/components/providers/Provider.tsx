import { IChildren } from "#types/index"

const Provider: React.FC<IChildren> = ({ children }: IChildren): JSX.Element => {
   return <>{children}</>
}

export default Provider
