'use client'

import { LoginSchema, RegisterSchema } from '#schemes/scheme'
import { Button } from '#ui/button'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import styles from './Auth.module.scss'
import Btn from '#ui/Btn/Btn'

const AuthSection: React.FC = (): JSX.Element => {
   const [title, setTitle] = useState(true)

   const getSheme = () => (title ? LoginSchema : RegisterSchema)
   // const getValues = () => (title ? IAuthLogin : IAuthRegister)

   const { register, handleSubmit } = useForm()

   const submitHandler = (event: any) => {
      // event.preventDefault()
      console.log(event)
   }

   return (
      <div className="container flex flex-col gap-4">
         <h1 className={styles.title}>{title ? 'Login' : 'Register'}</h1>
         <form className={styles.authForm} onSubmit={handleSubmit(submitHandler)}>
            <input type="email" placeholder="Enter your email" {...register('email')} />
            <input type="password" placeholder="Enter your password" {...register('password')} />

            {!title && (
               <>
                  <input type="text" placeholder="Enter your name" {...register('name')} />

                  <label htmlFor="gender" className="flex items-center gap-2">
                     Gender
                     <select id="gender" {...register('gender')}>
                        <option value={'male'}>Male</option>
                        <option value={'female'}>Female</option>
                     </select>
                  </label>
               </>
            )}

            <Btn type="submit" className="max-w-[300px]" text={title ? 'Login' : 'Register'} ariaLabel="Auth Btn" />
         </form>

         <span>
            {title ? 'Don`t have an account?' : 'Already have an account?'}
            <button onClick={() => setTitle(!title)} className="font-bold text-blue-800"> 
               click here
            </button>
         </span>
      </div>
   )
}

export default AuthSection
