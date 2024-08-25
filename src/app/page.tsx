import DefaultLayout from '#layouts/DefaultLayout'
import HomeSection from '#sections/Home/HomeSection'
const Home = async () => {
   return (
      <DefaultLayout full>
         <main>
            <HomeSection />
         </main>
      </DefaultLayout>
   )
}

export default Home
