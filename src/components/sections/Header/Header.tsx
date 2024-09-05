'use client'
import { useEffect } from 'react'
import { useBasketStore } from '#stores/basketStore'
import Btn from '#ui/Btn/Btn'
import Logo from '#ui/Logo'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { LogIn } from 'lucide-react'
import HeaderSearch from './HeaderSearch'
import HeaderUser from './HeaderUser'
import styles from './Header.module.scss'

const Header = () => {
   const basket = useBasketStore((state) => state.basket)
   const fetchBasket = useBasketStore((state) => state.fetchBasket)
   const session = useSession()

   useEffect(() => {
      fetchBasket()
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
               {session.status === 'loading' ? (
                  <div>Loading...</div>
               ) : session.status === 'unauthenticated' ? (
                  <Link className={`group p-0`} href={'/auth'}>
                     <LogIn className={`duration-300 group-hover:text-mini-100`} />
                  </Link>
               ) : (
                  <HeaderUser userData={session?.data?.user} />
               )}
            </nav>
         </div>
      </header>
   )
}

export default Header
