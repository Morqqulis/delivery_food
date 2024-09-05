import { coockieRemoveFromBasket, cookieAddToBasket, cookieGetBasket } from '#backend/actions/cookieBasketActions'
import { IBasketStore } from '#types/index'
import { create } from 'zustand'

export const useBasketStore = create<IBasketStore>((set) => ({
   basket: [],
   fetchBasket: async () => {
      const basketCookie = await cookieGetBasket()
      set({ basket: basketCookie })
   },

   addToBasket: async (productId: string, quantity: number) => {
      await cookieAddToBasket(productId, quantity)
      const updatedBasket = await cookieGetBasket()
      set({ basket: updatedBasket })
   },

   removeFromBasket: async (productId: string) => {
      await coockieRemoveFromBasket(productId)
      const updatedBasket = await cookieGetBasket()
      set({ basket: updatedBasket })
   },
}))
