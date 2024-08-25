import DefaultLayout from '#layouts/DefaultLayout'
import HomeHero from '#pages/Home/HomeHero'
const Home = async () => {
   return (
      <DefaultLayout full>
         <main className={`flex-[1_1_auto]`}>
            <HomeHero />
         </main>
      </DefaultLayout>
   )
}

export default Home
