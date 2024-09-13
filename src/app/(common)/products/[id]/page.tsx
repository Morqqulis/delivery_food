import DefaultLayout from '#layouts/DefaultLayout'
import ProductDetail from '#sections/Products/ProductDetail'
import { IParamsID } from '#types/index'
import { NextPage } from 'next'

export const revalidate = 0

const Product: NextPage<IParamsID> = async ({ params: { id } }: IParamsID): Promise<JSX.Element> => {
   return (
      <DefaultLayout full>
         <main>
            <ProductDetail id={id} />
         </main>
      </DefaultLayout>
   )
}

export default Product
