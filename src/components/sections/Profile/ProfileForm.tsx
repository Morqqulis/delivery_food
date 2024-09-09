'use client'
import { userGetByEmail } from '#backend/actions/userActions'
import { authConfig } from '#configs/authConfig'
import { userProfileSchema } from '#schemes/scheme'
import { IUser } from '#types/index'
import Btn from '#ui/Btn/Btn'
import { Form, FormControl, FormField, FormItem, FormLabel } from '#ui/form'
import { Input } from '#ui/input'
import { RadioGroup, RadioGroupItem } from '#ui/radio-group'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { DefaultUser, getServerSession } from 'next-auth'
import { getSession, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

interface ISessionUser {
   name?: string | null
   email?: string | null
   image?: string | null
}

const ProfileForm = ({ sessionUser }: { sessionUser: ISessionUser | null }): JSX.Element => {
   const form = useForm<z.infer<typeof userProfileSchema>>({
      defaultValues: {
         name: sessionUser?.name ? sessionUser?.name.toString() : '',
         email: sessionUser?.email ? sessionUser?.email.toString() : '',
         password: '',
         gender: 'male',
         address: '',
         phone: ``,
      },
      resolver: zodResolver(userProfileSchema),
   })

   const submitForm = async (data: z.infer<typeof userProfileSchema>) => {
      const res = await axios.put('/api/user', data)

      console.log(res.data)
   }

   return (
      <Form {...form}>
         <form
            className={`mx-auto flex max-w-[600px] flex-col gap-6 rounded-[15%] rounded-br-none rounded-tl-none border border-white px-14 py-5`}
            onSubmit={form.handleSubmit(submitForm)}
         >
            <FormField
               control={form.control}
               name={'name'}
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Name</FormLabel>
                     <FormControl>
                        <Input className={`text-black`} {...field} placeholder={'Adınızı daxil edin'} />
                     </FormControl>
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name={'email'}
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Email</FormLabel>
                     <FormControl>
                        <Input className={`text-black`} {...field} placeholder={'Emailinizi daxil edin.'} />
                     </FormControl>
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name={'password'}
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Şifrə</FormLabel>
                     <FormControl>
                        <Input {...field} type={'password'} placeholder={'Şifrənizi daxil edin.'} />
                     </FormControl>
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name={'phone'}
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Telefon nömrənisi</FormLabel>
                     <FormControl>
                        <Input {...field} type={'number'} placeholder={'Telefon nömrənizi daxil edin.'} />
                     </FormControl>
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name={'address'}
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Ünvan</FormLabel>
                     <FormControl>
                        <Input {...field} type={'text'} placeholder={'Ünvanınızı daxil edin'} />
                     </FormControl>
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name={'gender'}
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Cins</FormLabel>
                     <FormControl>
                        <RadioGroup
                           className="flex items-center space-x-2"
                           onValueChange={field.onChange}
                           defaultValue={field.value}
                           {...field}
                        >
                           <FormItem className={`flex items-center gap-2 text-center`}>
                              <FormControl>
                                 <RadioGroupItem className={`text-white`} value={'male'} />
                              </FormControl>
                              <FormLabel className={`-translate-y-1`}>Male</FormLabel>
                           </FormItem>
                           <FormItem className={`flex items-center gap-2 text-center`}>
                              <FormControl>
                                 <RadioGroupItem className={`text-white`} value={'female'} />
                              </FormControl>
                              <FormLabel className={`-translate-y-1`}>Female</FormLabel>
                           </FormItem>
                        </RadioGroup>
                     </FormControl>
                  </FormItem>
               )}
            />
            <Btn className={`w-full`} type={'submit'} text={'Update profile'} />
         </form>
      </Form>
   )
}

export default ProfileForm
