import { create } from "zustand";
import { persist, createJSONStorage, devtools } from "zustand/middleware";

interface OnboardingStoreTypes {
  progress: number;
  setProgress: (step: number) => void;
  nextProcess: () => void;
  prevProcess: () => void;
  clearProgress: () => void;
}

export const useOnboardingStore = create<OnboardingStoreTypes>()(
  devtools(
    persist(
      (set) => ({
        progress: 0,
        setProgress: (step: number) => set({ progress: step }),

        nextProcess: () => set((state) => ({ progress: state.progress + 1 })),
        prevProcess: () => set((state) => ({ progress: state.progress - 1 })),
        clearProgress: () =>
          set({
            progress: -1,
          }),
      }),

      {
        name: "onboarding",
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);
