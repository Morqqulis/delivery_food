import {
   cookieClearBasket,
   coockieRemoveFromBasket,
   cookieAddToBasket,
   cookieGetBasket,
   updateBasketItem,
} from '#backend/actions/cookieBasketActions'
import { productGetById, productsGetByIds } from '#backend/actions/productActions'
import { IBasketStore } from '#types/index'
import { create } from 'zustand'

export const useBasketStore = create<IBasketStore>((set) => ({
   basket: [],
   fetchBasket: async () => {
      const basketCookie = await cookieGetBasket()
      if (basketCookie.length) {
         const products = await productsGetByIds(basketCookie)
         set({ basket: products })
      }
   },

   addToBasket: async (productId: string, quantity: number) => {
      const cookieBasket = await cookieGetBasket()
      const currentCookieItem = cookieBasket.some((product) => product.product === productId)

      if (currentCookieItem) {
         await updateBasketItem(productId, quantity)
         set((state) => ({
            basket: state.basket.map((product) =>
               product._id === productId ? { ...product, quantity: product.quantity + quantity } : product,
            ),
         }))
      } else {
         await cookieAddToBasket(productId, quantity)
         const newProduct = await productGetById(productId, '')
         set((state) => ({ basket: [...state.basket, { ...newProduct, quantity }] }))
      }
   },

   removeFromBasket: async (productId: string) => {
      await coockieRemoveFromBasket(productId)
      set((state) => ({ basket: state.basket.filter((product: any) => product._id !== productId) }))
   },

   clearBasket: () => {
      cookieClearBasket()
      set({ basket: [] })
   },
}))
