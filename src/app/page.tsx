import DefaultLayout from '#layouts/DefaultLayout'
import HomeSection from '#sections/Home/HomeSection'
import { getServerSession } from 'next-auth'
import { Suspense } from 'react'

export const experimental_ppr = true

const Home = async () => {
   const session = await getServerSession()

   console.log(session)
   return (
      <DefaultLayout full>
         <main className={`h-full`}>
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
