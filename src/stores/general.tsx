import { create } from "zustand";
import { persist, devtools, createJSONStorage } from "zustand/middleware";
import { STATS_OPTIONS } from "../constants";

interface GeneralStore {
  isSendingBatch: boolean;
  isDoneWithBatch: boolean;
  isStats: boolean;
  isStatsCurrent: string;
  setIsSendingBatch: (val: boolean) => void;
  setIsDoneWithBatch: (val: boolean) => void;
  setIsStats: (val: boolean) => void;
  setIsStatsCurrent: (val: string) => void;
}

export const useGeneralStore = create<GeneralStore>()(
  devtools(
    persist(
      (set) => ({
        isSendingBatch: false,
        isDoneWithBatch: false,
        isStats: false,
        isStatsCurrent: STATS_OPTIONS[0].text,
        setIsSendingBatch: (val: boolean) => set({ isSendingBatch: val }),
        setIsDoneWithBatch: (val: boolean) => set({ isDoneWithBatch: val }),
        setIsStats: (val: boolean) => set({ isStats: val }),
        setIsStatsCurrent: (val: string) => set({ isStatsCurrent: val }),
      }),
      {
        name: "store",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
