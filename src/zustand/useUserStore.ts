import { IUser } from "@/types";
import { create } from "zustand";

type IUserStore = {
  user: IUser | null;
  setUser: (user: IUser) => void;
  removeUser: () => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
};
export const useUserStore = create<IUserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  removeUser: () => set({ user: null }),
  loading: true,
  setLoading: (loading) => set({ loading }),
}));
