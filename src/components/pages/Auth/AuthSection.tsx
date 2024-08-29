'use client'

import { LoginSchema, RegisterSchema } from '#schemes/scheme'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import styles from './Auth.module.scss'
import Btn from '#ui/Btn/Btn'
import { zodResolver } from '@hookform/resolvers/zod'
import { IFormValues } from '#types/index'
import axios from 'axios'
import { LoginDefault, RegisterDefault } from '#settings/defaultValues'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import { redirect, useRouter, useSearchParams } from 'next/navigation'
import { Label } from '#ui/label'
import { Input } from '#ui/input'
import {
   Select,
   SelectContent,
   SelectGroup,
   SelectItem,
   SelectLabel,
   SelectSeparator,
   SelectTrigger,
   SelectValue,
} from '#ui/select'
import { Button } from '#ui/button'
import { useToast } from '#ui/use-toast'
import { Toaster } from '#ui/toaster'

const AuthSection: React.FC = (): JSX.Element => {
   const [title, setTitle] = useState(true)
   const { toast } = useToast()
   const router = useRouter()

   const searchParams = useSearchParams()
   const callbackUrl = searchParams.get('callbackUrl') || '/user'

   const { register, handleSubmit, reset } = useForm<IFormValues>({
      resolver: zodResolver(title ? LoginSchema : RegisterSchema),
      defaultValues: title ? LoginDefault : RegisterDefault,
   })

   const submitHandler = async (data: IFormValues) => {
      if (title) {
         // const response = await axios.post('/api/auth/signin', data)
         const res = await signIn('credentials', {
            name: data.name,
            email: data.email,
            password: data.password,
            gender: data.gender,
            redirect: false,
         })
         if (res?.error) {
            toast({
               title: 'Error',
               description: 'Invalid Email or Password',
               variant: 'destructive',
            })
            console.log(res?.error)
         } else if (res && !res?.error) {
            toast({
               title: 'Success',
               description: 'Login successfully',
               variant: 'default',
            })
            setTimeout(() => {
               router.push('/')
            }, 2000)
         }
      } else {
         const response = await axios.post('/api/auth/signup', data)

         console.log(response?.data)
      }

      reset()
   }

   return (
      <section className="relative py-20">
         <div className="container">
            <h1 className={styles.title}>{title ? 'Login' : 'Register'}</h1>
            <form className={styles.authForm} onSubmit={handleSubmit(submitHandler)}>
               <Label>
                  <Input type="email" placeholder="Enter your email" {...register('email')} />
               </Label>
               <Label>
                  <Input type="password" placeholder="Enter your password" {...register('password')} />
               </Label>

               {!title && (
                  <>
                     <Label>
                        <Input type="text" placeholder="Enter your name" {...register('name')} />
                     </Label>

                     <Label>
                        <Select {...register('gender')}>
                           <SelectTrigger className="font-medium text-dark-800">
                              <SelectValue
                                 className={`!placeholder:text-black !text-black`}
                                 placeholder="Select a gender"
                              />
                           </SelectTrigger>
                           <SelectContent>
                              <SelectGroup className={`w-full`}>
                                 <SelectLabel>Genders</SelectLabel>
                                 <SelectSeparator className={`bg-light-400`} />
                                 <SelectItem
                                    className={`w-full cursor-pointer duration-300 ease-linear focus:bg-mini-100`}
                                    value="male"
                                 >
                                    Male
                                 </SelectItem>
                                 <SelectItem
                                    className={`w-full cursor-pointer duration-300 ease-linear focus:bg-mini-100`}
                                    value="female"
                                 >
                                    Female
                                 </SelectItem>
                              </SelectGroup>
                           </SelectContent>
                        </Select>
                     </Label>
                  </>
               )}

               <Btn
                  type="submit"
                  className="w-full max-w-[300px]"
                  text={title ? 'Login' : 'Register'}
                  ariaLabel="Auth Btn"
               />
            </form>
            {title && (
               <Btn
                  className={`mx-auto mb-5 flex w-full max-w-[300px] items-center justify-center gap-2`}
                  type={'button'}
                  text={'Sign in with Google'}
                  ariaLabel={'Login Btn'}
                  onClick={() => signIn('google', { callbackUrl })}
               >
                  <Image src={'/google.svg'} alt="Google Logo" width={20} height={20} />
               </Btn>
            )}

            <div className={`${styles.switch} flex items-center`}>
               {title ? 'Don`t have an account ? ' : 'Already have an account ? '}
               <Button
                  onClick={() => setTitle(!title)}
                  className="px-2 text-base font-bold text-blue-800 duration-300 hover:text-mini-100"
               >
                  click here
               </Button>
            </div>
         </div>
      </section>
   )
}

export default AuthSection
