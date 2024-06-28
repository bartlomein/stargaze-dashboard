import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useWalletStore = create(
  persist(
    (set: any, get: any) => ({
      address: "",
    }),
    {
      name: "wallet",
      storage: createJSONStorage(() => sessionStorage),
      skipHydration: true,
    }
  )
);
