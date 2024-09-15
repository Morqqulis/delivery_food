import DefaultLayout from '#layouts/DefaultLayout'
import HomeSection from '#sections/Home/HomeSection'
import { Suspense } from 'react'

const Home = async () => {
   return (
      <DefaultLayout full>
         <main>
            <Suspense
               fallback={
                  <div className={`grid h-full place-items-center text-center text-4xl text-tomato-300`}>
                     Loading...
                  </div>
               }
            >
               <HomeSection />
            </Suspense>
         </main>
      </DefaultLayout>
   )
}

export default Home
