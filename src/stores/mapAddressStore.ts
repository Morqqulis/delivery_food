import { create } from 'zustand'

interface IMapAddressStore {
   address: string
   setAddress: (address: string) => void
}

export const useMapAddressStore = create<IMapAddressStore>((set) => ({
   address: '28 Mall, Baku, Azerbaijan',
   setAddress: (address: string) => set({ address }),
}))
