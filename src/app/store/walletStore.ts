import { create } from "zustand";

type WalletT = {
  address: string | null;
};

export const useWalletStore = create<WalletT>(() => ({
  address: null,
}));
