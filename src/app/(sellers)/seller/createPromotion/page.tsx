import DefaultLayout from '#layouts/DefaultLayout'
import CreatePromotionSection from '#sections/Seller/Promotion/CreatePromotionSection'

const CreatePromotion: React.FC = (): JSX.Element => {
   return (
      <DefaultLayout full={false} aside>
         <main>
            <CreatePromotionSection />
         </main>
      </DefaultLayout>
   )
}

export default CreatePromotion
