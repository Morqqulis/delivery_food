import DefaultLayout from '#layouts/DefaultLayout'
import './App.style.scss'

const Home = () => {
   return (
      <DefaultLayout full>
         <main className={`flex-[1_1_auto]`}>
            <h1 className="title">Welcome</h1>
         </main>
      </DefaultLayout>
   )
}

export default Home
