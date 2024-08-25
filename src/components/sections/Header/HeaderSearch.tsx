'use client'
import { Input } from '#ui/input'
import { Label } from '#ui/label'

const HeaderSearch: React.FC = (): JSX.Element => {
   return (
      <Label className={`group/headerSearch relative flex w-full grow gap-4`}>
         <Input
            className={`placeholder:text-light-500 bg-dark-900 focus-visible:ring-mini-100 focus-visible:ring-offset-mini-100 border-none py-4 outline-none transition-all duration-300 placeholder:text-center placeholder:transition-all placeholder:duration-500 focus-within:placeholder:text-[0] focus-visible:ring-offset-1`}
            type={'text'}
            placeholder={`🔍 Search for dishes or ingredients`}
         />
      </Label>
   )
}

export default HeaderSearch
