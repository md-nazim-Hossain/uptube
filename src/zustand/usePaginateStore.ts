import { IPaginationMeta } from "@/types";
import { create } from "zustand";

type IState = {
  paginate: {
    page: number;
    limit: number;
  };
  setPaginate: (paginate: { page: number; limit: number }) => void;
};

export const usePaginateStore = create<IState>((set) => ({
  paginate: {
    page: 1,
    limit: 20,
  },
  setPaginate: (paginate) => set({ paginate }),
}));
