'use client'
import { IChildren } from '#types/index'
import Btn from '#ui/Btn/Btn'
import { useEffect, useState } from 'react'

interface ICustomDialog {}

const CustomDialog = ({ children }: IChildren) => {
   const [isOpen, setIsOpen] = useState<boolean>(false)

   useEffect(() => {
      const handleEscape = (event: KeyboardEvent) => {
         if (event.keyCode === 27 && isOpen) {
            setIsOpen(false)
         }
      }

      window.addEventListener('keydown', handleEscape)
      return () => window.removeEventListener('keydown', handleEscape)
   }, [isOpen])

   return (
      <>
         <Btn text={'Open Dialog'} onClick={() => setIsOpen(true)} />
         {isOpen && (
            <div className="fixed inset-0 z-10 overflow-y-auto">
               <div className="flex min-h-screen items-center justify-center p-4">
                  <div className="fixed inset-0 bg-black opacity-50" onClick={() => setIsOpen(false)} />
                  <div className="relative flex w-full max-w-3xl flex-col gap-5 rounded-lg bg-white p-4 shadow dark:bg-gray-700">
                     <div className={`flex items-center justify-between`}>
                        <h3 className={`text-center text-xl font-semibold text-tomato-200`}>Gozel Xerite</h3>
                        <Btn className={`ml-auto w-fit`} text={'X'} onClick={() => setIsOpen(false)} />
                     </div>

                     {children}
                  </div>
               </div>
            </div>
         )}
      </>
   )
}

export default CustomDialog
