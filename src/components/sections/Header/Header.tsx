'use client'
import Btn from '#ui/Btn/Btn'
import Logo from '#ui/Logo'
import { LogIn } from 'lucide-react'
import Link from 'next/link'
import styles from './Header.module.scss'
import HeaderSearch from './HeaderSearch'
import { useEffect, useState } from 'react'
import { basketGetUserId } from '#backend/actions/basketActions'

const Header = () => {
   const [basket, setBasket] = useState([])
   useEffect(() => {
      ;(async () => {
         const basketData: any = await basketGetUserId('66cc1dd356e909720e7b292d')
         setBasket(basketData?.products)
      })()
   }, [])

   return (
      <header className={`${styles.header}`}>
         <div className="container">
            <nav className={`flex items-center justify-between gap-8`}>
               <Logo className={styles.logo} />
               <HeaderSearch />
               <Btn
                  className={`px-11 py-2`}
                  text={`Orders (${basket.length})`}
                  type={'button'}
                  ariaLabel={'Orders Btn'}
                  href="/basket"
               />
               <Link className={`group p-0`} href={'/auth'}>
                  <LogIn className={`duration-300 group-hover:text-mini-100`} />
               </Link>
            </nav>
         </div>
      </header>
   )
}

export default Header
