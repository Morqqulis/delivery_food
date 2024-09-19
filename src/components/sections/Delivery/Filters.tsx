import { IOrder, IProduct } from '#types/index'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '#ui/select'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

const Filters: React.FC<{
   setFilteredOrder: Dispatch<SetStateAction<(IOrder & { products: { product: IProduct; accepted: boolean }[] })[]>>
   orders: (IOrder & { products: { product: IProduct; accepted: boolean }[] })[]
}> = ({ setFilteredOrder, orders }): JSX.Element => {

   
   const handleFilter = (e: string) => {
      if (e === 'all' || e === 'input:') {
         setFilteredOrder(orders)
         return
      }
      if (e.startsWith('input')) {
         setFilteredOrder(orders?.filter((item) => item._id.toString().includes(e.split(':')[1])))
         return
      }

      if (e.startsWith('type')) {
         setFilteredOrder(orders?.filter((item) => item.deliveryType === e.split(':')[1]))
         return
      }

      if (e.startsWith('status')) {
         setFilteredOrder(orders?.filter((item) => item.status === e.split(':')[1]))
      }
   }

   return (
      <div className="flex items-center gap-7 p-5">
         <Select onValueChange={handleFilter}>
            <SelectTrigger className="w-[180px] border-none bg-slate-800">
               <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
               <SelectItem value="all">All</SelectItem>
               <SelectItem value="status:accepted">Accepted</SelectItem>
               <SelectItem value="status:pending">Pending</SelectItem>
               <SelectItem value="status:delivered">Delivered</SelectItem>
               <SelectItem value="status:fullfilled">Fullfilled</SelectItem>
            </SelectContent>
         </Select>

         <Select onValueChange={handleFilter}>
            <SelectTrigger className="w-[180px] border-none bg-slate-800">
               <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
               <SelectItem value="all">All</SelectItem>
               <SelectItem value="type:standart">Standart</SelectItem>
               <SelectItem value="type:address">Address</SelectItem>
            </SelectContent>
         </Select>

         <input
            type="text"
            onChange={(e) => handleFilter(`input:${e.target.value}`)}
            placeholder="Enter Order ID"
            className="w-[300px] rounded-md border-none bg-slate-800 p-2 outline-none"
         />
      </div>
   )
}

export default Filters
