import { coockieRemoveFromBasket, cookieAddToBasket, cookieGetBasket } from '#backend/actions/cookieBasketActions'
import { productsGetByIds } from '#backend/actions/productActions'
import { IBasketStore } from '#types/index'
import { create } from 'zustand'

export const useBasketStore = create<IBasketStore>((set) => ({
   basket: [],
   fetchBasket: async () => {
      const basketCookie = await cookieGetBasket()
      const product = await productsGetByIds(basketCookie)
      set({ basket: product })
   },

   addToBasket: async (productId: string, quantity: number) => {
      await cookieAddToBasket(productId, quantity)
      const updatedBasket = await cookieGetBasket()
      const products = await productsGetByIds(updatedBasket)
      set({ basket: products })
   },

   removeFromBasket: async (productId: string) => {
      await coockieRemoveFromBasket(productId)
      // const updatedBasket = await cookieGetBasket()
      // get product from basket state

      set((state) => ({ basket: state.basket.filter((product: any) => product._id !== productId) }))
   },
}))
