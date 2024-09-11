'use server'

import { cookies } from 'next/headers'

export async function cookieSetRecently(product: string[]) {
   cookies().set({
      name: 'recently',
      value: JSON.stringify(product),
      httpOnly: false,
      path: '/',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
   })
}

export async function cookieGetRecently(): Promise<string[]> {
   const recentlyCookie = cookies().get('recently')

   if (recentlyCookie && recentlyCookie.value) {
      try {
         return JSON.parse(recentlyCookie.value)
      } catch (e) {
         console.error('xeta bas verdi:', e)
         return []
      }
   }
   return []
}

export async function cookieUpdateRecently(productId: string) {
   const recentlyProducts = await cookieGetRecently()

   if (recentlyProducts.includes(productId) || !productId) return

   recentlyProducts.unshift(productId)
   
   if (recentlyProducts.length >= 10) {
      recentlyProducts.pop()
   }
   cookieSetRecently(recentlyProducts)
}

export async function cookieClearRecently() {
   await cookieSetRecently([])
}
