import { emailSchema } from '#schemes/scheme'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { z } from 'zod'

const [userData, setUserData] = useState(null)

export const useSessionEmail = () => {
   const sessionEmail = useSession().data?.user?.email

   const fetchUserData = async (email: z.infer<typeof emailSchema>) => {
      if (!email) return
      try {
         const res = await axios.post('/api/user', email)
         setUserData(await res.data)
         console.log(userData)
         return
      } catch (error) {
         console.log('Error in fetchUserData at useSessionEmail: ', error)
      }
   }

   useEffect(() => {
      if (!sessionEmail) return
      fetchUserData(sessionEmail)
   }, [])

   return userData
}
