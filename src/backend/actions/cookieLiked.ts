'use server'

import { cookies } from 'next/headers'

export async function cookieSetLiked(product: string[]) {
   cookies().set({
      name: 'liked',
      value: JSON.stringify(product),
      httpOnly: false,
      path: '/',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
   })
}

export async function cookieGetLiked(): Promise<string[]> {
   const likedCookie = cookies().get('liked')

   if (likedCookie && likedCookie.value) {
      try {
         return JSON.parse(likedCookie.value)
      } catch (e) {
         console.error('xeta bas verdi:', e)
         return []
      }
   }
   return []
}

export async function cookieUpdateLiked(productId: string) {
   const likedProducts = await cookieGetLiked()
   const existingItem = likedProducts.includes(productId)

   if (!existingItem) {
      likedProducts.push(productId)
      cookieSetLiked(likedProducts)
   } else {
      const updatedLiked = likedProducts.filter((item) => item !== productId)
      cookieSetLiked(updatedLiked)
   }
}

export async function cookieClearLiked() {
   await cookieSetLiked([])
}
