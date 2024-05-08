import { TDBTable, TUser } from "@/utils/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const session = create<TSessionHook>()(
  persist(
    (set) => ({
      userLogged: undefined,
      login: (user) => set(() => ({ userLogged: user })),
      logout: () => set({ userLogged: undefined }),
    }),
    {
      name: "session",
    }
  )
);

export default function useSession() {
  return session((s) => s);
}

type TSessionHook = {
  userLogged?: TDBTable<TUser>;
  login: (user: TDBTable<TUser>) => void;
  logout: () => void;
};
