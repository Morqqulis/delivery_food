import DefaultLayout from '#layouts/DefaultLayout'
import HomeProductDetails from '#sections/Home/HomeProductDetails'
import { IParamsID } from '#types/index'
import { NextPage } from 'next'

export const revalidate = 0

const Product: NextPage<IParamsID> = async ({ params: { id } }: IParamsID): Promise<JSX.Element> => {
   return (
      <DefaultLayout full>
         <main>
            <HomeProductDetails id={id} />
         </main>
      </DefaultLayout>
   )
}

export default Product
