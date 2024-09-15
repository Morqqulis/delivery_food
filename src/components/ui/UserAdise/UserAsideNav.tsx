import { userNav } from '#static/userAsideData'
import Btn from '#ui/Btn/Btn'
import Link from 'next/link'

interface IUserAsideNav {}

const UserAsideNav = () => {
   return (
      <nav>
         <ul className={`flex flex-col gap-5`}>
            {userNav.map((item) => (
               <li key={item.id}>
                  <Btn
                     className={`py-4 !text-xl`}
                     href={`/${item.link}`}
                     text={item.name}
                     ariaLabel={`${item.name} Link`}
                     children={item.icon && item.icon}
                  />
               </li>
            ))}
         </ul>
      </nav>
   )
}

export default UserAsideNav
