import { IGroupedProductsOrders, IBasket } from '#types/index'

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

export const groupedBySeller = (
   basket: [
      {
         product: {
            seller: string
         }
         quantity: number
      },
   ],
) => {
   return basket.reduce(
      (acc, item) => {
         const sellerId = item.product.seller

         if (!acc[sellerId]) {
            acc[sellerId] = []
         }

         acc[sellerId].push(item)

         return acc
      },
      {} as Record<string, { product: (typeof basket)[0]['product']; quantity: number }[]>,
   )
}
