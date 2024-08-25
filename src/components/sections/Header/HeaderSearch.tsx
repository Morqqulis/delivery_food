'use client'
import { productsNameQuery } from '#backend/actions/productActions'
import { Input } from '#ui/input'
import { Label } from '#ui/label'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const HeaderSearch: React.FC = (): JSX.Element => {
   const [value, setValue] = useState('')
   const [data, setData] = useState<any>([])

   useEffect(() => {
      if (!value) return
      ;(async () => {
         const data = await productsNameQuery(value)
         data && setData(data)
      })()
   }, [value])

   return (
      <Label className={`group/headerSearch relative flex w-full grow gap-4`}>
         <Input
            className={`border-none bg-dark-900 py-4 outline-none transition-all duration-300 placeholder:text-center placeholder:text-light-500 placeholder:transition-all placeholder:duration-500 focus-within:placeholder:text-[0] focus-visible:ring-mini-100 focus-visible:ring-offset-1 focus-visible:ring-offset-mini-100`}
            type={'text'}
            placeholder={`🔍 Search for dishes or ingredients`}
            onChange={(e) => {
               setTimeout(() => {
                  setValue(e.target.value)
               }, 500)
            }}
         />
         {value && (
            <div className="absolute top-12 z-10 flex h-fit max-h-52 min-h-40 w-full flex-col gap-2 overflow-y-auto rounded-lg bg-dark-900 p-2">
               {data.length
                  ? data.map((product: any) => (
                       <Link
                          href={`/${product._id}`}
                          key={product._id}
                          className="flex items-center gap-5 bg-dark-700 p-2"
                       >
                          <Image src="./qazan.svg" width={30} height={30} alt={'search image'} />

                          <div className="flex flex-col gap-2">
                             <p>{product.name}</p>
                             <p>{product.description}</p>
                          </div>
                       </Link>
                    ))
                  : 'No results'}
            </div>
         )}
      </Label>
   )
}

export default HeaderSearch
