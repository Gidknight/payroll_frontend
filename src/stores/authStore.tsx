import { AuthStoreTypes, AuthUserTypes } from "../types";
import { create } from "zustand";
import { persist, createJSONStorage, devtools } from "zustand/middleware";
// import { User } from '../types'

export const useAuthStore = create<AuthStoreTypes>()(
  devtools(
    persist(
      (set) => ({
        userAuth: {
          id: "",
          username: "",
          email: "",
          status: false,
          role: "",
          entry_id: "",
        },
        setUser: (data: AuthUserTypes) => set({ userAuth: data }),
        auth: false,
        setAuth: (value) => set({ auth: value }),
        clearUser: () =>
          set({
            userAuth: {
              id: "",
              username: "",
              email: "",
              status: false,
              role: "",
              entry_id: "",
            },
          }),
      }),

      {
        name: "auth",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
