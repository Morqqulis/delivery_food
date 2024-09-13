'use client'
import { userGetByEmail } from '#backend/actions/userActions'
import { authConfig } from '#configs/authConfig'
import { userProfileSchema } from '#schemes/scheme'
import { IUser } from '#types/index'
import Btn from '#ui/Btn/Btn'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '#ui/form'
import { Input } from '#ui/input'
import Map from '#ui/Map/Map'
import { RadioGroup, RadioGroupItem } from '#ui/radio-group'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { DefaultUser, getServerSession } from 'next-auth'
import { getSession, useSession } from 'next-auth/react'
import Link from 'next/link'
import { Suspense, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const ProfileForm = ({ userData }: { userData: IUser | null }): JSX.Element => {
   const form = useForm<z.infer<typeof userProfileSchema>>({
      defaultValues: {
         name: userData?.name ? userData.name : '',
         email: userData?.email ? userData.email : '',
         password: userData?.password ? userData.password : '',
         gender: userData?.gender ? userData.gender : 'male',
         address: userData?.address ? userData.address : '',
         phone: userData?.phone ? userData.phone : '',
      },
      resolver: zodResolver(userProfileSchema),
   })

   const submitForm = async (data: z.infer<typeof userProfileSchema>) => {
      const res = await axios.put('/api/user', data)

      console.log(data)
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
                        <Input
                           className={`text-black focus-visible:ring-mini-100`}
                           {...field}
                           placeholder={'Adınızı daxil edin'}
                        />
                     </FormControl>
                     <FormMessage className={`text-tomato-200`} />
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
                        <Input
                           className={`text-black focus-visible:ring-mini-100`}
                           {...field}
                           placeholder={'Emailinizi daxil edin.'}
                        />
                     </FormControl>
                     <FormMessage className={`text-tomato-200`} />
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
                        <Input
                           className={`text-black focus-visible:ring-mini-100`}
                           {...field}
                           type={'password'}
                           placeholder={'Şifrənizi daxil edin.'}
                        />
                     </FormControl>
                     <FormMessage className={`text-tomato-200`} />
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
                        <Input
                           className={`!appearance-none text-black focus-visible:ring-mini-100`}
                           {...field}
                           type={'text'}
                           placeholder={'Telefon nömrənizi daxil edin.'}
                        />
                     </FormControl>
                     <FormMessage className={`text-tomato-200`} />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name={'address'}
               render={({ field }) => (
                  <>
                     <FormItem>
                        <FormLabel>Ünvan</FormLabel>
                        <FormControl>
                           <Input
                              className={`text-black focus-visible:ring-mini-100`}
                              {...field}
                              type={'text'}
                              placeholder={'Ünvanınızı daxil edin'}
                           />
                        </FormControl>
                        <FormMessage className={`text-tomato-200`} />
                     </FormItem>
                     {/* <Btn text={'MAP'} className={`w-full`} type={'button'} ariaLabel={'Xerite'}>
                        <Map />
                     </Btn> */}
                  </>
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
                              <FormLabel className={`-translate-y-1 cursor-pointer`}>Kisi</FormLabel>
                           </FormItem>
                           <FormItem className={`flex items-center gap-2 text-center`}>
                              <FormControl>
                                 <RadioGroupItem className={`text-white`} value={'female'} />
                              </FormControl>
                              <FormLabel className={`-translate-y-1 cursor-pointer`}>Qadin</FormLabel>
                           </FormItem>
                        </RadioGroup>
                     </FormControl>
                     <FormMessage className={`text-tomato-200`} />
                  </FormItem>
               )}
            />
            <Btn
               className={`w-full`}
               type={'submit'}
               text={'Update profile'}
               onClick={() => form.handleSubmit(submitForm)}
            />
         </form>
      </Form>
   )
}

export default ProfileForm
