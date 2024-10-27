import { create } from "zustand";
import { persist, devtools, createJSONStorage } from "zustand/middleware";

interface ReceiptStore {
  activeReceipt: { id: string; name: string };

  setActiveReceipt: (obj: { id: string; name: string }) => void;
}

export const useReceiptStore = create<ReceiptStore>()(
  devtools(
    persist(
      (set) => ({
        activeReceipt: { id: "", name: "" },

        setActiveReceipt: (obj: { id: string; name: string }) =>
          set({ activeReceipt: obj }),
      }),
      {
        name: "receipt",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
