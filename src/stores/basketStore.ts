import {
   cookieClearBasket,
   coockieRemoveFromBasket,
   cookieAddToBasket,
   cookieGetBasket,
   updateBasketItem,
} from '#backend/actions/cookieBasketActions'
import { productGetById, productsGetByIds } from '#backend/actions/productActions'
import { IBasket, IBasketStore, IProduct, ISelectedAttributes } from '#types/index'
import { create } from 'zustand'

export const useBasketStore = create<IBasketStore>((set) => ({
   basket: [],
   fetchBasket: async () => {
      const basketCookie = await cookieGetBasket()
      try {
         if (basketCookie.length > 0) {
            const products = (await productsGetByIds(basketCookie)).map((prod: IProduct) => {
               const newProd = basketCookie.find((product) => product.product.toString() === prod._id.toString())
               return { ...prod, selectedAttributes: newProd?.selectedAttributes }
            })

            set({ basket: products })
         }
      } catch (error) {
         console.log('Error in fetchBasket at useBasketStore: ', error)
      }
   },

   updateBasketStore: async (productId: string, quantity: number, selectedAttributes: ISelectedAttributes) => {
      try {
         await updateBasketItem(productId, quantity, selectedAttributes)
         set((state) => ({
            basket: state.basket.map((product) =>
               product._id === productId
                  ? { ...product, quantity: product.quantity + quantity, selectedAttributes }
                  : product,
            ),
         }))
      } catch (error) {
         console.log('Error in updateBasketItem at useBasketStore: ', error)
      }
   },

   addToBasket: async (productId: string, quantity: number, selectedAttributes: ISelectedAttributes) => {
      try {
         const cookieBasket = await cookieGetBasket()
         const currentCookieItem = cookieBasket.some((product) => product.product === productId)
         if (currentCookieItem) {
            await updateBasketItem(productId, quantity, selectedAttributes)
            set((state) => ({
               basket: state.basket.map((product) =>
                  product._id === productId
                     ? { ...product, quantity: product.quantity + quantity, selectedAttributes }
                     : product,
               ),
            }))
         } else {
            await cookieAddToBasket(productId, quantity, selectedAttributes)
            const newProduct = await productGetById(productId, '')
            set((state) => ({ basket: [...state.basket, { ...newProduct, quantity, selectedAttributes }] }))
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
