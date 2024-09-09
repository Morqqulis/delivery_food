import CompletedOrdersSection from '#sections/Delivery/CompletedOrders/CompletedOrdersSection'

interface Ipage {}

const CompletedOrders: React.FC = (): JSX.Element => {
   return (
      <main>
         <CompletedOrdersSection />
      </main>
   )
}

export default CompletedOrders
