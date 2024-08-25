import Navbar from '#sections/Navbar/Navbar'
import { LogIn } from 'lucide-react'
import HeaderSearch from './HeaderSearch'
import Logo from '#ui/Logo'
import styles from './Header.module.scss'
import Btn from '#ui/Btn/Btn'
import { Button } from '#ui/button'

const Header = () => {
   return (
      <header className={`${styles.header}`}>
         <div className="container">
            <nav className={`flex items-center gap-4`}>
               <Logo className={styles.logo} />
               <HeaderSearch />
               <Btn className={`px-11 py-2`} text={'Orders (0)'} type={'button'} ariaLabel={'Orders Btn'} />
               <Button className={`group p-0`}>
                  <LogIn className={`group-hover:text-mini-100 duration-300`} />
               </Button>
            </nav>
         </div>
      </header>
   )
}

export default Header
