import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '#ui/table'

const BasketSection: React.FC = (): JSX.Element => {
   return (
      <Table className="container">
         <TableCaption>A list of your recent invoices.</TableCaption>
         <TableHeader>
            <TableRow>
               <TableHead className="w-[100px]">Id</TableHead>
               <TableHead>Name</TableHead>
               <TableHead>Description</TableHead>
               <TableHead>Count</TableHead>
               <TableHead>Price</TableHead>
               <TableHead className="text-right">Total</TableHead>
            </TableRow>
         </TableHeader>
         <TableBody>
            <TableRow>
               <TableCell className="font-medium">INV001</TableCell>
               <TableCell>Paid</TableCell>
               <TableCell>Credit Card</TableCell>
               <TableCell>4</TableCell>
               <TableCell>10</TableCell>
               <TableCell className="text-right">$250.00</TableCell>
            </TableRow>
         </TableBody>
         <TableFooter>
            <TableRow>
               <TableCell />
               <TableCell>Total Amount</TableCell>
               <TableCell />
               <TableCell />
               <TableCell />
               <TableCell className="text-right">$250.00</TableCell>
            </TableRow>
         </TableFooter>
      </Table>
   )
}

export default BasketSection
