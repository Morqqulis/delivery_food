'use client'
import { useBasketStore } from '#stores/basketStore'
import { IChildren, ISelectedAttributes } from '#types/index'
import Btn from '#ui/Btn/Btn'

interface CounterProps {
   count: number
   setCount: (count: number) => void
   text: string
   id: string
   className?: string
   selectedAttributes: ISelectedAttributes
}

const Counter: React.FC<CounterProps> = ({ count, setCount, text, id, className, selectedAttributes }): JSX.Element => {
   const addToBasket = useBasketStore((state) => state.addToBasket)

   const handleAddToBasket = async () => {
      await addToBasket(id, count, selectedAttributes)
      setCount(1)
   }

   return (
      <div className={`${className} flex items-center justify-between gap-2`}>
         <div className="flex gap-2 text-xl">
            <button
               className="rounded bg-gray-900 px-2 text-white duration-300 hover:bg-tomato-200"
               type={'button'}
               aria-label={'decrease count Btn'}
               onClick={() => count > 0 && setCount(count - 1)}
            >
               -
            </button>
            <p className="w-[30px] text-center">{count}</p>
            <button
               className="rounded bg-gray-900 px-2 text-white duration-300 hover:bg-tomato-200"
               type={'button'}
               aria-label={'increase count Btn'}
               onClick={() => setCount(count + 1)}
            >
               +
            </button>
         </div>
         <Btn text={text} ariaLabel="Add Btn" className="w-full px-5 py-3" onClick={handleAddToBasket} />
      </div>
   )
}

export default Counter
