'use server'

import { IBasketItem } from '#types/index'
import { cookies } from 'next/headers'



// Cookie-den basketi elde edirik
export async function cookieGetBasket(): Promise<IBasketItem[]> {
   const cookieStore = cookies()
   const basketCookie = cookieStore.get('basket')

   // Yoxlayirig cookie varsa ve deyeri varsa - elde edirik
   if (basketCookie && basketCookie.value) {
      try {
         return JSON.parse(basketCookie.value) // Value - string veziyetinde elde etmek ucun.
      } catch (e) {
         console.error('cookie elde etdikde - xeta:', e)
         return []
      }
   }
   return []
}

// Basketin yaranmasi cookie-de
export async function cookieSetBasket(basket: IBasketItem[]) {
   cookies().set({
      name: 'basket',
      value: JSON.stringify(basket),
      httpOnly: false, // Cliyent-de el catsin ya yox.
      path: '/',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // Cookie 7 gun yawiyacag.
   })
}

// Mehsul elave etmek.
export async function cookieAddToBasket(productId: string, quantity: number = 1) {
   const basket = await cookieGetBasket()
   const existingItem = basket.find((item: IBasketItem) => item.product === productId)

   if (existingItem) {
      existingItem.quantity += quantity
   } else {
      basket.push({ product: productId, quantity })
   }

   cookieSetBasket(basket)
}

// Mehsulu silmek.
export async function coockieRemoveFromBasket(productId: string) {
   const basket = await cookieGetBasket()
   const updatedBasket = basket.filter((item) => item.product !== productId)

   cookieSetBasket(updatedBasket)
}

// quantity deyisdir
export async function updateIBasketItem(productId: string, quantity: number) {
   const basket = await cookieGetBasket()
   const item = basket.find((item: IBasketItem) => item.product === productId)

   if (item) {
      item.quantity = quantity
      cookieSetBasket(basket)
   }
}

// Basketi temizlemek ucun.
export async function clearBasket() {
   await cookieSetBasket([])
}
