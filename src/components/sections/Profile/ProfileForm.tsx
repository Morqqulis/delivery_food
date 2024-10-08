'use client'
import { userProfileSchema } from '#schemes/scheme'
import { IUser } from '#types/index'
import Btn from '#ui/Btn/Btn'
import 'react-phone-number-input/style.css'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '#ui/form'
import { Input } from '#ui/input'
import { RadioGroup, RadioGroupItem } from '#ui/radio-group'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import PhoneInput from 'react-phone-number-input'
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

   const submitForm = async (data: z.infer<typeof userProfileSchema>) => await axios.put('/api/user', data)

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
                           className={`!px-2 !py-2 text-black focus-visible:ring-mini-100`}
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
                        <PhoneInput
                           className={`!appearance-none text-black focus-visible:ring-mini-100`}
                           {...field}
                           type={'text'}
                           placeholder={'Telefon nömrənizi daxil edin.'}
                           defaultCountry={'AZ'}
                        />
                        {/* <Input
                           className={`!appearance-none text-black focus-visible:ring-mini-100`}
                           {...field}
                           type={'text'}
                           placeholder={'Telefon nömrənizi daxil edin.'}
                        /> */}
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
