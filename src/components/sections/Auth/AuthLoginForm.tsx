'use client'

import Btn from '#ui/Btn/Btn'
import { Form, FormControl, FormField, FormItem, FormLabel } from '#ui/form'
import { Input } from '#ui/input'
import { useToast } from '#ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import styles from './Auth.module.scss'

const loginShema = z.object({
   email: z
      .string({ required_error: 'Email is required', invalid_type_error: 'Please enter a valid email.' })
      .email({ message: 'Please enter a valid email.' }),
   password: z
      .string({ required_error: 'Password is required' })
      .min(1, { message: 'Password must be at least 5 characters.' }),
})

const AuthLoginForm: React.FC = (): JSX.Element => {
   const form = useForm({
      resolver: zodResolver(loginShema),
      defaultValues: { email: '', password: '' },
   })
   const { toast } = useToast()
   const router = useRouter()
   const searchParams = useSearchParams()
   const callbackUrl = searchParams.get('callbackUrl') || '/profile'

   const handleLogin = async (values: z.infer<typeof loginShema>) => {
      try {
         const res = await signIn('credentials', {
            email: values.email,
            password: values.password,
            callbackUrl,
            // redirect: false,
         })

         if (res?.error) {
            toast({
               title: 'Error',
               description: 'Invalid Email or Password',
               variant: 'destructive',
            })
            console.log(res?.error)
         }

         if (res && !res?.error) {
            toast({
               title: 'Success',
               description: 'Login successfully',
               variant: 'default',
            })
            setTimeout(() => {
               router.push('/profile')
            }, 2000)
         }
      } catch (error) {
         console.log(error)
      }
      form.reset()
   }

   return (
      <>
         <Form {...form}>
            <form className={`${styles.authForm}`} onSubmit={form.handleSubmit(handleLogin)}>
               <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                     <FormItem className={`!space-y-0`}>
                        <FormLabel className={`!p-0`}>
                           <FormControl>
                              <Input type="email" placeholder="Enter your email" {...field} />
                           </FormControl>
                        </FormLabel>
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                     <FormItem className={`!space-y-0`}>
                        <FormLabel className={`!p-0`}>
                           <FormControl>
                              <Input type="password" placeholder="Enter your password" {...field} />
                           </FormControl>
                        </FormLabel>
                     </FormItem>
                  )}
               />
               <Btn type={'submit'} ariaLabel={'Sign In button'} text={'Sign In'} />
            </form>
         </Form>
         <Btn
            className={'mb-5 w-full max-w-[350px]'}
            text={'Login with Google'}
            type={'button'}
            ariaLabel={'Login with Google'}
            onClick={() => signIn('google', { callbackUrl })}
         >
            <Image src={'/google.svg'} alt={'google'} width={32} height={32} />
         </Btn>
      </>
   )
}

export default AuthLoginForm
