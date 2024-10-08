import Image from 'next/image'
import Link from 'next/link'

interface ITable {
   headers: string[]
   body: any[]
   footer?: any[]
}

const Table: React.FC<ITable> = ({ headers, body, footer }): JSX.Element => {
   return (
      <div className="w-full pt-10 mmd:overflow-auto">
         <table className="min-w-full overflow-y-auto bg-gray-100 text-gray-800">
            <thead className="rounded-2xl shadow-md">
               <tr>
                  {headers.map((header) => (
                     <th
                        key={header}
                        className="px-6 py-3 text-center text-sm font-medium uppercase tracking-wider text-gray-500"
                     >
                        {header}
                     </th>
                  ))}
               </tr>
            </thead>
            <tbody className="text-sm font-medium  tracking-wider text-gray-500">
               {body?.map((row) => (
                  <tr key={Math.random() * 10000} className="border-b-2 text-center">
                     {Object.entries(row).map(([key, value]: any) => (
                        <td
                           key={Math.random() * 10000}
                           className={`px-4 py-3 ${key === 'image' && 'flex items-center justify-center'}`}
                        >
                           {key === 'image' ? (
                              <Image src={value as string} width={50} height={50} alt={key} />
                           ) : key.toLocaleLowerCase() === '_id' ? (
                              <>
                                 {value.toString().slice(0, 2)}***{value.toString().slice(-2)}
                              </>
                           ) : key.toLocaleLowerCase() === 'price' && value.toString().startsWith('$discount') ? (
                              <>
                                 <span className="line-through">${value.toString().split('/')[1]}</span>&nbsp;
                                 <span className="font-bold">${value.toString().split('/')[2]}</span>
                              </>
                           ) : value?.toString().startsWith('link') ? (
                              <Link className="underline hover:font-bold" href={value.toString().split('*')[1]}>
                                 {value.toString().split('*')[2]}
                              </Link>
                           ) : (
                              <> {value} </>
                           )}
                        </td>
                     ))}
                     {}
                  </tr>
               ))}
            </tbody>
            {footer && (
               <tfoot className="bg-gray-100">
                  <tr>
                     {footer.map((footer, index) => (
                        <td
                           key={footer + index}
                           className="px-6 py-3 text-center text-sm font-medium uppercase text-gray-500"
                        >
                           {footer}
                        </td>
                     ))}
                  </tr>
               </tfoot>
            )}
         </table>
      </div>
   )
}

export default Table
