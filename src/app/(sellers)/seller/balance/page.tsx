import DefaultLayout from '#layouts/DefaultLayout'
import BalanceSection from '#sections/Seller/Balance/BalanceSection'

const BalancePage: React.FC = (): JSX.Element => {
   return (
      <DefaultLayout full={false} aside={true}>
         <main>
            <BalanceSection />
         </main>
      </DefaultLayout>
   )
}

export default BalancePage
