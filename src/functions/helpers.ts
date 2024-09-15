import { IBasket, IComment, IProduct } from '#types/index'

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

   const price = product.promotions
      ? product.promotions.discountType === 'percentage' && product.promotions.discountValue
         ? `discount/${product.price}/${product.price - (product.price * product.promotions.discountValue) / 100}`
         : 0
      : product.price

   return price
}

export function getTotal(product: IBasket) {
   if (!product) return
   const price = getPrice(product)

   const priceNumber = price && price.toString().startsWith('discount') ? price.toString().split('/')[2] : product.price

   const total = product.promotions
      ? product.promotions.discountType === 'percentage' && product.promotions.discountValue
         ? +priceNumber * product.quantity
         : 0
      : product.price * product.quantity

   return total
}

export const calculateTotal = (basket: IBasket[]) => {
   if (!basket) return

   return basket.reduce((total: number, product: IBasket) => {
      // @ts-ignore
      return total + getTotal(product)
   }, 0)
}
