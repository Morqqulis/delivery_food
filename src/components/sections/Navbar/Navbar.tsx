import Link from 'next/link'

const Navbar: React.FC = (): JSX.Element => {
   return (
      <div className="flex gap-3 font-bold text-blue-700">
         <Link href="/">Home</Link>
         <Link href="/auth">Login</Link>
      </div>
   )
}

export default Navbar
