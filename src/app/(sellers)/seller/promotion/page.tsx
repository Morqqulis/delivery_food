import DefaultLayout from '#layouts/DefaultLayout'
import PromotionSection from '#sections/Seller/Promotion/PromotionSection'

const CreatePromotion: React.FC = (): JSX.Element => {
   return (
      <DefaultLayout full={false} aside>
         <main>
            <PromotionSection />
         </main>
      </DefaultLayout>
   )
}

export default CreatePromotion
