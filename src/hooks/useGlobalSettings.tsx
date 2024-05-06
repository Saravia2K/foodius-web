import { CSSProperties } from "react";
import { create } from "zustand";

const useGlobalSettings = create<TUseGlobalSettings>((set) => ({
  mainStyles: {},
  setMainStyles: (s) => set({ mainStyles: s }),
}));
export default useGlobalSettings;

type TUseGlobalSettings = {
  mainStyles: CSSProperties;
  setMainStyles: (style: CSSProperties) => void;
};
