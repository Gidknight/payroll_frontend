import { create } from "zustand";
import { persist, devtools, createJSONStorage } from "zustand/middleware";
import { STATS_OPTIONS } from "../constants";

interface GeneralStore {
  isSendingBatch: boolean;
  isDoneWithBatch: boolean;
  isAddingAllowance: boolean;
  isAddingDeduction: boolean;
  isStats: boolean;
  isStatsCurrent: string;
  activeStaff: { id: number } | null;
  setIsSendingBatch: (val: boolean) => void;
  setIsDoneWithBatch: (val: boolean) => void;
  setIsAddingAllowance: (val: boolean) => void;
  setIsAddingDeduction: (val: boolean) => void;
  setIsStats: (val: boolean) => void;
  setIsStatsCurrent: (val: string) => void;
  setActiveStaff: (val: { id: number } | null) => void;
}

export const useGeneralStore = create<GeneralStore>()(
  devtools(
    persist(
      (set) => ({
        isSendingBatch: false,
        isDoneWithBatch: false,
        isStats: false,
        isAddingAllowance: false,
        isAddingDeduction: false,
        isStatsCurrent: STATS_OPTIONS[0].text,
        activeStaff: null,
        setIsSendingBatch: (val: boolean) => set({ isSendingBatch: val }),
        setIsDoneWithBatch: (val: boolean) => set({ isDoneWithBatch: val }),
        setIsStats: (val: boolean) => set({ isStats: val }),
        setIsStatsCurrent: (val: string) => set({ isStatsCurrent: val }),
        setIsAddingAllowance: (val: boolean) => set({ isAddingAllowance: val }),
        setIsAddingDeduction: (val: boolean) => set({ isAddingDeduction: val }),
        setActiveStaff: (val: { id: number } | null) =>
          set({ activeStaff: val }),
      }),
      {
        name: "store",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
