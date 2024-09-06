'use client'
import { authConfig } from '#configs/authConfig'
import { userProfileSchema } from '#schemes/scheme'
import { Form, FormControl, FormField, FormItem, FormLabel } from '#ui/form'
import { Input } from '#ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { getServerSession } from 'next-auth'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

interface IProfileForm {}

const ProfileForm: React.FC = (): JSX.Element => {
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
