'use client'
import { useActionState, useState } from 'react'
import AuthLoginForm from './AuthLoginForm'
import AuthRegisterForm from './AuthRegisterForm'
import { Button } from '#ui/button'

interface IAuthWrapper {}

const AuthWrapper: React.FC = (): JSX.Element => {
   const [value, setValue] = useState('signIn')
   

   const handleChangeValue = () => {
      setValue(value === 'signIn' ? 'signUp' : 'signIn')
      return
   }

   return (
      <section className={`h-full py-20`}>
         <div className="container h-full">
            <div className={`flex h-full flex-col items-center justify-center gap-1`}>
               {value === 'signIn' ? <AuthLoginForm /> : <AuthRegisterForm />}
               <div className={`flex items-center text-sm`}>
                  <span>{value === 'signIn' ? 'Allready have an account?' : 'Don`t have an account?'}</span>
                  <Button className={`px-2 font-semibold text-blue-500`} onClick={handleChangeValue}>
                     {value === 'signIn' ? 'Sign Up' : 'Sign In'}
                  </Button>
               </div>
            </div>
         </div>
      </section>
   )
}

export default AuthWrapper
