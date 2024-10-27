import { create } from 'zustand'
import { persist, devtools, createJSONStorage } from 'zustand/middleware'

interface NavStore {
  active: string
  setActive: (value: string) => void
}

export const useNavStore = create<NavStore>()(
  devtools(
    persist(
      (set) => ({
        active: 'dashboard',
        setActive: (value) => {
          set(() => ({ active: value }))
        }
      }),

      {
        name: 'activeNav',
        storage: createJSONStorage(() => sessionStorage)
      }
    )
  )
)
