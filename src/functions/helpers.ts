import { IBasket, IComment, IOrder, IOrderItem, IOrderItemProducts, IProduct } from '#types/index'

export function createToken(str: string): string {
   const getRandomChars = (length: number) =>
      Array.from({ length }, () => ((Math.random() * 36) | 0).toString(36)).join('')
   return str
      .split('')
      .map((char) => char + getRandomChars(24))
      .join('')
}

export function processToken(str: string) {
   return str
      .split('')
      .filter((_, i) => i % 25 === 0)
      .join('')
}

export function dateFormatter(date: Date | undefined) {
   if (!date) return

   return `${date.toString().slice(0, 10)} at ${date.toString().slice(11, 16)}`
}
export function daysSince(dateString: string): number {
   const now = new Date()
   const past = new Date(dateString)
   const diffInMs = now.getTime() - past.getTime()
   const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))
   return diffInDays
}

export function hoursSince(dateString: string): number {
   const now = new Date()
   const past = new Date(dateString)
   const diffInMs = now.getTime() - past.getTime()
   const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
   return diffInHours
}

export function averageRating(comments: IComment[] | undefined): number {
   return comments?.length ? comments.reduce((acc, comment) => acc + comment.rating, 0) / comments.length : 0
}

export function getPrice(product: IProduct | IBasket) {
   if (!product) return
   const price =
      product.promotions?.isActive &&
      product.promotions?.discountType === 'percentage' &&
      product.promotions.discountValue
         ? `discount/${product.price}/${product.price - (product.price * product.promotions.discountValue) / 100}`
         : product.promotions?.discountType === 'count&percentage' &&
             product.promotions.discountValue &&
             product.promotions.minimumOrderCount &&
             // @ts-ignore
             product.promotions.minimumOrderCount <= product.quantity
           ? `discount/${product.price}/${product.price - (product.price * 10) / 100}`
           : product.price

   return price
}

export function getTotal(product: IBasket) {
   if (!product) return
   const price = getPrice(product)

   const priceNumber = price && price.toString().startsWith('discount') ? price.toString().split('/')[2] : product.price

   const total =
      product.promotions?.isActive &&
      (product.promotions?.discountType === 'percentage' ||
         (product.promotions?.discountType === 'count&percentage' && product.promotions.discountValue))
         ? +priceNumber * product.quantity
         : product.price * product.quantity

   return +total.toFixed(2)
}

export const calculateTotal = (basket: IBasket[] | IProduct[] | IOrderItemProducts[]) => {
   if (!basket) return

   return basket.reduce((total: number, product: IBasket | IProduct) => {
      // @ts-ignore
      return total + getTotal(product)
   }, 0)
}
