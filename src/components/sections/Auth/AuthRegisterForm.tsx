'use client'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '#ui/form'
import { Input } from '#ui/input'
import { useToast } from '#ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import styles from './Auth.module.scss'
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
import axios from 'axios'
import Btn from '#ui/Btn/Btn'

const genderOptions = ['male', 'female'] as const
type Gender = (typeof genderOptions)[number]

const registerShema = z.object({
   email: z
      .string({ required_error: 'Email is required', invalid_type_error: 'Please enter a valid email.' })
      .email({ message: 'Please enter a valid email.' }),
   password: z
      .string({ required_error: 'Password is required' })
      .min(1, { message: 'Password must be at least 5 characters.' }),
   firstName: z.string().min(1, 'Name is required'),
   gender: z.enum(genderOptions, { required_error: 'Gender is required' }),
})

const AuthRegisterForm: React.FC = (): JSX.Element => {
   const { toast } = useToast()
   const form = useForm({
      defaultValues: { email: '', password: '', firstName: '', gender: 'male' as Gender },
      resolver: zodResolver(registerShema),
   })

   const handleRegister = async (values: z.infer<typeof registerShema>) => {
      try {
         const response = await axios.post('/api/auth/signup', values)
         toast({
            title: 'Success',
            description: 'Register successfully',
            variant: 'succesfull',
         })

         console.log(response?.data)
      } catch (error) {
         toast({
            title: 'Error',
            description: 'Email already exists',
            variant: 'destructive',
         })
         throw error
      }

      form.reset()
   }

   return (
      <Form {...form}>
         <form className={`${styles.authForm}`} onSubmit={form.handleSubmit(handleRegister)}>
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
            <FormField
               control={form.control}
               name="firstName"
               render={({ field }) => (
                  <FormItem className={`!space-y-0`}>
                     <FormLabel className={`!p-0`}>
                        <FormControl>
                           <Input type="text" placeholder="Enter your first name" {...field} />
                        </FormControl>
                     </FormLabel>
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name="gender"
               render={({ field }) => (
                  <FormItem className={`!space-y-0`}>
                     <FormLabel className={`!p-0`}>
                        <FormControl>
                           <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                        </FormControl>
                     </FormLabel>
                  </FormItem>
               )}
            />
            <Btn className={`w-full`} type={'submit'} ariaLabel={'Submit button'} text={'Sign Up'} />
         </form>
      </Form>
   )
}

export default AuthRegisterForm
