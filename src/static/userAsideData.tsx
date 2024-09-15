import { IUserNav } from '#types/index'
import { History, ListOrdered, UserPen } from 'lucide-react'
export const userNav: IUserNav[] = [
   {
      id: 1,
      name: 'Profile',
      link: 'profile',
      icon: <UserPen />,
   },
   {
      id: 2,
      name: 'Orders',
      link: 'orders',
      icon: <ListOrdered />,
   },
   {
      id: 3,
      name: 'History',
      link: 'history',
      icon: <History />,
   },
]
