'use server'

import { IBasketItem } from '#types/index'
import { cookies } from 'next/headers'

export async function cookieGetBasket(): Promise<IBasketItem[]> {
   const basketCookie = cookies().get('basket')

   if (basketCookie && basketCookie.value) {
      try {
         return JSON.parse(basketCookie.value)
      } catch (e) {
         console.error('cookie elde etdikde - xeta:', e)
         return []
      }
   }
   return []
}

export async function cookieSetBasket(basket: IBasketItem[]) {
   cookies().set({
      name: 'basket',
      value: JSON.stringify(basket),
      httpOnly: false,
      path: '/',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
   })
}

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

export async function coockieRemoveFromBasket(productId: string) {
   const basket = await cookieGetBasket()
   const updatedBasket = basket.filter((item) => item.product !== productId)

   cookieSetBasket(updatedBasket)
}

export async function updateBasketItem(productId: string, quantity: number) {
   const basket = await cookieGetBasket()
   const item = basket.find((item: IBasketItem) => item.product === productId)

   if (item) {
      item.quantity += quantity
      cookieSetBasket(basket)
   }
}

export async function cookieClearBasket() {
   await cookieSetBasket([])
}
