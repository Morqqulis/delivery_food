import { productUpdateById } from '#backend/actions/productActions'
import DefaultLayout from '#layouts/DefaultLayout'
import axios from 'axios'
const Home = async () => {
   // const res = await axios.post('http://localhost:3000/api/products', 1)
   // console.log(res.data)


   return (
      <DefaultLayout full>
         <main className={`flex-[1_1_auto]`}></main>
      </DefaultLayout>
   )
}

export default Home
