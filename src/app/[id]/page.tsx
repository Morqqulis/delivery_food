import DefaultLayout from '#layouts/DefaultLayout'
import ProductPage from '#pages/ProductPage/ProductPage'
import { IParamsID } from '#types/index'
import { NextPage } from 'next'

const Product: NextPage<IParamsID> = ({ params: { id } }: IParamsID): JSX.Element => {
   return (
      <DefaultLayout full>
         <main>
            <ProductPage id={id} />
         </main>
      </DefaultLayout>
   )
}

export default Product
