import { create } from "zustand";

type IAuthStore = {
  open: boolean;
  setOpen: (open: boolean) => void;
};
export const useAuthStore = create<IAuthStore>((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
}));
