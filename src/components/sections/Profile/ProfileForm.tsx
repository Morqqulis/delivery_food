'use client'
import { userProfileSchema } from '#schemes/scheme'
import { IUser } from '#types/index'
import { Form, FormControl, FormField, FormItem, FormLabel } from '#ui/form'
import { Input } from '#ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

interface IProfileForm {}

const ProfileForm: React.FC = (): JSX.Element => {
   const [userData, setUserData] = useState<IUser | null>(null)
   const sessionEmail = useSession().data?.user?.email

   useEffect(() => {
      if (!sessionEmail) return
      const fetchUserData = async (email: any) => {
         if (!email) return
         try {
            const res = await axios.post('/api/user', email)
            setUserData(await res.data)
            console.log(userData)
            return 
         } catch (error) {
            console.log('Error in fetchUserData at ProfileForm: ', error)
         }
         return
      }
      fetchUserData(sessionEmail)

   }, [])

   const from = useForm({
      defaultValues: {
         firstName: '',
         lastName: '',
         email: '',
         phone: '',
         password: '',
         newPassword: '',
         confirmPassword: '',
         gender: 'male',
         address: '',
      },
      resolver: zodResolver(userProfileSchema),
   })

   const onSubmit = (data: any) => {
      console.log(data)
   }

   return (
      <Form {...from}>
         <form className={`flex flex-col gap-6`} onSubmit={from.handleSubmit(onSubmit)}>
            <FormField
               control={from.control}
               name={'firstName'}
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>First Name</FormLabel>
                     <FormControl>
                        <Input {...field} placeholder={'Adınızı daxil edin'} />
                     </FormControl>
                  </FormItem>
               )}
            />
         </form>
      </Form>
   )
}

export default ProfileForm
