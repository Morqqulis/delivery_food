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
      try {
         if (basketCookie.length > 0) {
            const products = await productsGetByIds(basketCookie)
            set({ basket: products })
         }
      } catch (error) {
         console.log('Error in fetchBasket at useBasketStore: ', error)
      }
   },

   addToBasket: async (productId: string, quantity: number) => {
      try {
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
      } catch (error) {
         console.log('Error in addToBasket at useBasketStore: ', error)
      }
   },

   removeFromBasket: async (productId: string) => {
      if (!productId) return

      try {
         await coockieRemoveFromBasket(productId)
         set((state) => ({ basket: state.basket.filter((product: any) => product._id !== productId) }))
      } catch (error) {
         console.log('Error in removeFromBasket at useBasketStore: ', error)
      }
   },

   clearBasket: () => {
      cookieClearBasket()
      set({ basket: [] })
   },
}))
