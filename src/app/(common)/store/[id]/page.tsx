import DefaultLayout from '#layouts/DefaultLayout'
import StoreSection from '#sections/Store/StoreSection'
import { IParamsID } from '#types/index'
import { NextPage } from 'next'

const SellerPage: NextPage<IParamsID> = async ({ params: { id } }: IParamsID): Promise<JSX.Element> => {
   return (
      <DefaultLayout full>
         <main>
            <StoreSection id={id} />
         </main>
      </DefaultLayout>
   )
}

export default SellerPage
