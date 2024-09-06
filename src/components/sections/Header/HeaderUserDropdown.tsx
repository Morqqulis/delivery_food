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
import { DefaultSession } from 'next-auth'
import { signOut } from 'next-auth/react'

const HeaderUserDropdown = ({ userData }: { userData: DefaultSession['user'] }): JSX.Element => {
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
            <DropdownMenuItem>
               <Btn
                  className={`w-full text-center hover:bg-gray-300`}
                  href={'/profile'}
                  ariaLabel={'Profile Button'}
                  text={'Profile'}
               />
            </DropdownMenuItem>
            <DropdownMenuSeparator className={`bg-neutral-400`} />
            <DropdownMenuItem>
               <Btn
                  className={`w-full text-center hover:bg-gray-300`}
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
