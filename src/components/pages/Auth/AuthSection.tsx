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

const AuthSection: React.FC = (): JSX.Element => {
   const [title, setTitle] = useState(true)

   const { register, handleSubmit, reset } = useForm<IFormValues>({
      resolver: zodResolver(title ? LoginSchema : RegisterSchema),
      defaultValues: title ? LoginDefault : RegisterDefault,
   })

   const submitHandler = async (data: IFormValues) => {
      if (title) {
         const response = await axios.post('/api/auth/signin', data)

         console.log(response?.data)
      } else {
         const response = await axios.post('/api/auth/signup', data)

         console.log(response?.data)
      }

      reset()
   }

   return (
      <section className="py-20">
         <div className="container">
            <h1 className={styles.title}>{title ? 'Login' : 'Register'}</h1>
            <form className={styles.authForm} onSubmit={handleSubmit(submitHandler)}>
               <input type="email" placeholder="Enter your email" {...register('email')} />
               <input type="password" placeholder="Enter your password" {...register('password')} />

               {!title && (
                  <>
                     <input type="text" placeholder="Enter your name" {...register('name')} />

                     <label className="flex items-center gap-2">
                        Gender
                        <select id="gender" {...register('gender')}>
                           <option value={'male'}>Male</option>
                           <option value={'female'}>Female</option>
                        </select>
                     </label>
                  </>
               )}

               <Btn
                  type="submit"
                  className="w-full max-w-[300px]"
                  text={title ? 'Login' : 'Register'}
                  ariaLabel="Auth Btn"
               />
            </form>

            <div className={`${styles.switch}`}>
               {title ? 'Don`t have an account ? ' : 'Already have an account ? '}
               <button onClick={() => setTitle(!title)} className="font-bold text-blue-800">
                  {' '}
                  click here
               </button>
            </div>
         </div>
      </section>
   )
}

export default AuthSection
