'use client'
import { useBasketStore } from '#stores/basketStore'
import { IChildren, ISelectedAttributes } from '#types/index'
import Btn from '#ui/Btn/Btn'
import Count from './Count'

interface CounterProps {
   count: number
   setCount: (count: number) => void
   text: string
   id: string
   className?: string
   selectedAttributes: ISelectedAttributes
}

const AddToBasketBtn: React.FC<CounterProps> = ({ count, setCount, text, id, className, selectedAttributes }): JSX.Element => {
   const addToBasket = useBasketStore((state) => state.addToBasket)

   const handleAddToBasket = async () => {
      await addToBasket(id, count, selectedAttributes)
      setCount(1)
   }

   return (
      <div className={`${className} flex items-center justify-between gap-2`}>
         <Count count={count} setCount={setCount} id={id} />
         <Btn text={text} ariaLabel="Add Btn" className="w-full px-5 py-3" onClick={handleAddToBasket} />
      </div>
   )
}

export default AddToBasketBtn
