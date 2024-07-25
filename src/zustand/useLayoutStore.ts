import { create } from "zustand";
type ILayoutStore = {
  openStudioSidebar: boolean;
  setOpenStudioSidebar: (open: boolean) => void;
  openUPTubeSidebar: boolean;
  setOpenUPTubeSidebar: (openUPTubeSidebar: boolean) => void;
};
export const useLayoutStore = create<ILayoutStore>((set) => ({
  openStudioSidebar: false,
  setOpenStudioSidebar: (open) => set({ openStudioSidebar: open }),
  openUPTubeSidebar: false,
  setOpenUPTubeSidebar: (openUPTubeSidebar) => set({ openUPTubeSidebar }),
}));
