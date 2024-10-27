import { create } from 'zustand'
import { persist, devtools, createJSONStorage } from 'zustand/middleware'
import { StoreDataTypes } from '../types'

interface GeneralStore {
  isLoginOpen: boolean
  isAddProduct: boolean
  isProcessSales: boolean
  isSalesSuccessful: boolean
  isOwner: boolean
  activeObj: { id: string; name: string }
  storeData: StoreDataTypes
  activeReceipt: { id: string; name: string }

  setActiveReceipt: (obj: { id: string; name: string }) => void

  setIsOwner: (val: boolean) => void
  setIsLoginOpen: (val: boolean) => void
  setIsAddProductOpen: (val: boolean) => void
  setIsProcessSales: (val: boolean) => void
  setIsSalesSuccessful: (val: boolean) => void

  setActiveObj: (obj: { id: string; name: string }) => void
  setStoreData: (data: StoreDataTypes) => void
}

export const useGeneralStore = create<GeneralStore>()(
  devtools(
    persist(
      (set) => ({
        isOwner: false,
        isLoginOpen: false,
        isAddProduct: false,
        isProcessSales: false,
        isSalesSuccessful: false,
        activeObj: { id: '', name: '' },
        storeData: {
          id: 0,
          address: '',
          email: '',
          name: '',
          primary_contact: '',
          secondary_contact: '',
          website: ''
        },
        activeReceipt: { id: '', name: '' },
        setIsOwner: (val: boolean) => set({ isOwner: val }),
        setIsLoginOpen: (val: boolean) => set({ isLoginOpen: val }),
        setIsAddProductOpen: (val: boolean) => set({ isAddProduct: val }),
        setIsProcessSales: (val: boolean) => set({ isProcessSales: val }),
        setIsSalesSuccessful: (val: boolean) =>
          set({ isSalesSuccessful: val, isProcessSales: false }),

        setActiveObj: (obj: { id: string; name: string }) => set({ activeObj: obj }),
        setStoreData: (data: StoreDataTypes) => set({ storeData: data }),
        setActiveReceipt: (obj: { id: string; name: string }) => set({ activeReceipt: obj })
      }),
      {
        name: 'store',
        storage: createJSONStorage(() => localStorage)
      }
    )
  )
)
