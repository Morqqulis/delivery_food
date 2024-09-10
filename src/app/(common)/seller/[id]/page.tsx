import DefaultLayout from '#layouts/DefaultLayout'
import { IParamsID } from '#types/index'
import { NextPage } from 'next'

const SellerPage: NextPage<IParamsID> = async ({ params: { id } }: IParamsID): Promise<JSX.Element> => {
   return (
      <DefaultLayout full>
         <main>{id}</main>
      </DefaultLayout>
   )
}

export default SellerPage
