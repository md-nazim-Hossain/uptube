"use client";

import { IAPIResponse, IVideo } from "@/types";
import { useFetch } from "@/utils/reactQuery";
import { apiRoutes } from "@/utils/routes";
import React, { createContext, ReactNode, Suspense, useContext } from "react";

type IShortContext = {
  shorts: IVideo[];
  isLoading: boolean;
};
const ShortsContext = createContext<IShortContext>({
  isLoading: false,
  shorts: [],
});
export function useShortsProvider() {
  return useContext(ShortsContext);
}

export default function ShortsProvider({ children }: { children: ReactNode }) {
  const { data, isLoading } = useFetch<IAPIResponse<IVideo[]>>(
    apiRoutes.videos.getAllShorts,
  );
  return (
    <ShortsContext.Provider value={{ shorts: data?.data || [], isLoading }}>
      <Suspense>{children}</Suspense>
    </ShortsContext.Provider>
  );
}
