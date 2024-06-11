import { TBusiness, TDBTable, TUser } from "@/utils/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const session = create<TSessionHook>()(
  persist(
    (set) => ({
      userLogged: undefined,
      loginUser: (user) => set(() => ({ userLogged: user })),
      logoutUser: () => set({ userLogged: undefined }),
      businessLogged: undefined,
      loginBusiness: (business) => set(() => ({ businessLogged: business })),
      logoutBusiness: () => set({ businessLogged: undefined }),
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
  loginUser: (user: TDBTable<TUser>) => void;
  logoutUser: () => void;
  businessLogged?: TDBTable<TBusiness>;
  loginBusiness: (user: TDBTable<TBusiness>) => void;
  logoutBusiness: () => void;
};
