import { IPoint } from '#types/index'
import Btn from '#ui/Btn/Btn'
import Logo from '#ui/Logo'
import { AlignEndVertical, Bolt, CirclePlus, House, ListOrdered } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
interface IProps {
   pointInfo: IPoint
}
const DeliveryAside: React.FC<IProps> = ({ pointInfo }): JSX.Element => {
   const menuItems = [
      { id: 1, name: 'Dashboard', icon: <House />, route: '/seller' },
      { id: 2, name: 'Products', icon: <AlignEndVertical />, route: '/seller/products' },
      { id: 3, name: 'Add Product', icon: <CirclePlus />, route: '/seller/products/add' },
      { id: 4, name: 'Active Orders', icon: <Bolt />, route: '/seller/orders' },
      { id: 5, name: 'History', icon: <ListOrdered />, route: '/seller/history' },
   ]

   return (
      <div className="flex h-screen w-full flex-col gap-6 bg-[#1a1a2e] p-4 text-white">
         <div className="mb-6 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-500 text-2xl font-bold text-white">
               {pointInfo.name.charAt(0)}
            </div>
            <div>
               <h3 className="text-lg font-semibold">{pointInfo.name}</h3>
               <p className="text-sm text-gray-300">{pointInfo.address}</p>
            </div>
         </div>

         <nav className="flex flex-col gap-4">
            {menuItems.map((item) => (
               <Link
                  key={item.id}
                  href={item.route}
                  className="flex items-center gap-3 rounded-md p-2 transition-colors hover:bg-[#162447]"
               >
                  {item.icon}
                  <span>{item.name}</span>
               </Link>
            ))}
         </nav>

         <div className="mt-auto">
            <Btn
               ariaLabel="exit"
               text="Exit"
               className="w-full rounded-md bg-red-500 py-2 text-white transition-colors hover:bg-red-600"
            />
         </div>
      </div>
   )
}

export default DeliveryAside
