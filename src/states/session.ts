import { create } from "zustand";

export const useSession = create<TSessionHook>((set) => ({
  loggedIn: false,
  login: () => set(() => ({ loggedIn: true })),
  logout: () => set({ loggedIn: false }),
}));

type TSessionHook = {
  loggedIn: boolean;
  login: () => void;
  logout: () => void;
};
