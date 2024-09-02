'use server'

import { cookies } from 'next/headers'

type BasketItem = {
   productId: string
   quantity: number
}

// Cookie-den basketi elde edirik
export function cookieGetBasket(): BasketItem[] {
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
export function cookieSetBasket(basket: BasketItem[]) {
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
export function cookieAddToBasket(productId: string, quantity: number = 1) {
   const basket = cookieGetBasket()
   const existingItem = basket.find((item) => item.productId === productId)

   if (existingItem) {
      existingItem.quantity += quantity
   } else {
      basket.push({ productId, quantity })
   }

   cookieSetBasket(basket)
}

// Mehsulu silmek.
export function removeFromBasket(productId: string) {
   const basket = cookieGetBasket()
   const updatedBasket = basket.filter((item) => item.productId !== productId)

   cookieSetBasket(updatedBasket)
}

// quantity deyisdir
export function updateBasketItem(productId: string, quantity: number) {
   const basket = cookieGetBasket()
   const item = basket.find((item) => item.productId === productId)

   if (item) {
      item.quantity = quantity
      cookieSetBasket(basket)
   }
}

// Basketi temizlemek ucun.
export function clearBasket() {
   cookieSetBasket([])
}
