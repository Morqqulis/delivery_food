import React from 'react'

interface TableProps {
   header: string[]
   body: (string | JSX.Element)[][]
   footer?: string[]
}

const Table: React.FC<TableProps> = ({ header, body, footer }) => {
   return (
      <div className={`overflow-x-auto rounded-lg shadow-md`}>
         <table className={`min-w-full `}>
            <thead className="bg-gray-100">
               <tr>
                  {header.map((headerItem, index) => (
                     <th
                        key={index}
                        className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider text-gray-500"
                     >
                        {headerItem}
                     </th>
                  ))}
               </tr>
            </thead>
            <tbody className="w-full divide-y divide-gray-200 bg-white">
               {body.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                     {row.map((cell, cellIndex) => (
                        <td key={cellIndex} className={`w-[${100 / row.length}%] px-6 py-4 text-sm text-gray-900`}>
                           {cell}
                        </td>
                     ))}
                  </tr>
               ))}
            </tbody>
            {footer && (
               <tfoot className="bg-gray-100">
                  <tr>
                     {footer.map((footerItem, index) => (
                        <td
                           key={index}
                           className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider text-gray-500"
                        >
                           {footerItem}
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
