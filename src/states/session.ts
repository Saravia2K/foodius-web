import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useSession = create<TSessionHook>()(
  persist(
    (set) => ({
      loggedIn: false,
      login: () => set(() => ({ loggedIn: true })),
      logout: () => set({ loggedIn: false }),
    }),
    {
      name: "session",
    }
  )
);

type TSessionHook = {
  loggedIn: boolean;
  login: () => void;
  logout: () => void;
};
