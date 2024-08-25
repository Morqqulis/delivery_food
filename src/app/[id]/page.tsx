import DefaultLayout from '#layouts/DefaultLayout'
import { IParamsID } from '#types/index'
import { NextPage } from 'next'

const Product: NextPage<IParamsID> = ({ params: { id } }: IParamsID): JSX.Element => {
   return (
      <DefaultLayout full>
         <main>Product</main>
      </DefaultLayout>
   )
}

export default Product
