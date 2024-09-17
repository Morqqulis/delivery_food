import { Ban } from 'lucide-react'

interface IError {}

const Error = ({ className }: { className?: string }) => {
   return <Ban className={`${className} flex w-full items-center justify-center`} size={200} />
}

export default Error
