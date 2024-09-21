import { IAddProduct } from '#types/index'
import { UseFormReturn } from 'react-hook-form'
import SelectColor from './Selects/SelectColor'
import SelectSize from './Selects/SelectSize'
import SelectCategory from './Selects/SelectCategory'
import { toBase64 } from '../../../../../functions/helpers'

const AddFormLabel: React.FC<{
   form: UseFormReturn<IAddProduct>
   type: string
   name: keyof IAddProduct
   rows?: number
}> = ({ form, type, name, rows }): JSX.Element => {
   const { register, setValue } = form
   return (
      <div className="col-span-1 w-[45%]">
         <label className="text-sm font-medium text-gray-300">{name[0].toUpperCase() + name.slice(1)}</label>
         {type === 'category' ? (
            <SelectCategory setValue={setValue} />
         ) : type === 'color' ? (
            <SelectColor setValue={setValue} />
         ) : type === 'size' ? (
            <SelectSize setValue={setValue} />
         ) : type === 'textarea' ? (
            <textarea
               {...register(name)}
               className={`mt-1 w-full rounded-md border-gray-700 bg-gray-900 text-white shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50`}
               rows={rows}
            />
         ) : type === 'file' ? (
            <input
               multiple
               type="file"
               accept="image/*"
               onChange={async (e) => {
                  e.preventDefault()
                  if (!e.target.files) return
                  const selectedImages = Array.from(e.target.files)
                  if (selectedImages.length === 0) return
                  const base64Images = await Promise.all(selectedImages.map((image) => toBase64(image)))
                  setValue('images', base64Images)
               }}
               className={`mt-1 w-full rounded-md border-gray-700 bg-gray-900 p-2 text-white shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50`}
            />
         ) : (
            <input
               {...register(name)}
               type={type}
               className={`mt-1 w-full rounded-md border-gray-700 bg-gray-900 p-2 text-white shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50`}
            />
         )}
      </div>
   )
}

export default AddFormLabel
