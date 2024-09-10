import StarRating from '#sections/Comments/StarRating'
import { ISeller } from '#types/index'
import { Mail, MapPin, Phone } from 'lucide-react'

const StoreTitle: React.FC<{ store: ISeller }> = ({ store }): JSX.Element => {
   return (
      <div className="flex items-center justify-between rounded-xl bg-[#162447] px-9 py-6">
         <div className="flex flex-col gap-1">
            <p className="font-sans text-3xl font-bold text-red-500">{store?.name}</p>
            <p className="">{store?.secondName}</p>
            <StarRating rating={5} size="20" />
         </div>

         <div className="flex flex-col gap-2">
            <p className="flex items-center gap-5">
               <Mail /> {store?.email}
            </p>
            <p className="flex items-center gap-5">
               <Phone /> {store?.phone}
            </p>
            <p className="flex items-center gap-5">
               <MapPin /> {store?.address}
            </p>
         </div>
      </div>
   )
}

export default StoreTitle
