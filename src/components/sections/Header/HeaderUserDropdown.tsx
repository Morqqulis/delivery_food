'use client'
import { userNav } from '#static/userAsideData'
import { IUserNav } from '#types/index'
import { Avatar, AvatarFallback, AvatarImage } from '#ui/avatar'
import Btn from '#ui/Btn/Btn'
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from '#ui/dropdown-menu'
import { Check } from 'lucide-react'
import { DefaultSession } from 'next-auth'
import { signOut } from 'next-auth/react'
import { usePathname } from 'next/navigation'

const HeaderUserDropdown = ({ userData }: { userData: DefaultSession['user'] }): JSX.Element => {
   const path = usePathname()

   return (
      <DropdownMenu>
         <DropdownMenuTrigger>
            <Avatar>
               <AvatarImage src={userData?.image || ''} />
               <AvatarFallback className={`font-bold uppercase text-black`}>
                  {userData?.name && userData?.name[0]}
               </AvatarFallback>
            </Avatar>
         </DropdownMenuTrigger>
         <DropdownMenuContent>
            <DropdownMenuLabel>{userData?.name}</DropdownMenuLabel>
            <DropdownMenuSeparator className={`bg-neutral-400`} />
            {userNav.map((item: IUserNav) => (
               <DropdownMenuItem key={item.id}>
                  <Btn
                     className={`w-full px-2 py-1 text-center ${path === `/${item.link}` && 'items-center !justify-between'}`}
                     href={`/${item.link}`}
                     ariaLabel={`${item.name} Button`}
                     text={item.name}
                     children={
                        path === `/${item.link}` && (
                           <Check className={`text-mini-100 duration-300 group-hover/btn:text-tomato-200`} size={20} />
                        )
                     }
                  />
                  <DropdownMenuSeparator key={item.id} className={`bg-neutral-400`} />
               </DropdownMenuItem>
            ))}
            <DropdownMenuItem>
               <Btn
                  className={`w-full py-1 text-center`}
                  onClick={() => signOut({ callbackUrl: '/' })}
                  ariaLabel={'Logout Button'}
                  text={'Logout'}
               />
            </DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   )
}

export default HeaderUserDropdown
