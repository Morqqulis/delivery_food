import DefaultLayout from '#layouts/DefaultLayout'
import ProductPage from '#sections/Profile/ProductPage'
import { IParamsID } from '#types/index'
import { NextPage } from 'next'

export const revalidate = 0

const Product: NextPage<IParamsID> = async ({ params: { id } }: IParamsID): Promise<JSX.Element> => {
   return (
      <DefaultLayout full>
         <main>
            <ProductPage id={id} />
         </main>
      </DefaultLayout>
   )
}

export default Product
