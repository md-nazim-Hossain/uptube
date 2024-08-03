"use client";

import { IVideo } from "@/types";
import { useLoadMore } from "@/utils/reactQuery";
import { apiRoutes } from "@/utils/routes";
import React, {
  createContext,
  ReactNode,
  Suspense,
  useContext,
  useEffect,
} from "react";
import { useInView } from "react-intersection-observer";

type IShortContext = {
  shorts: IVideo[];
  isLoading: boolean;
  inViewRef: (node?: Element | null) => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
};
const ShortsContext = createContext<IShortContext>({
  isLoading: false,
  shorts: [],
  inViewRef: () => {},
  hasNextPage: false,
  isFetchingNextPage: false,
});
export function useShortsProvider() {
  return useContext(ShortsContext);
}

export default function ShortsProvider({ children }: { children: ReactNode }) {
  const { ref, inView } = useInView();
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useLoadMore<IVideo[]>(apiRoutes.videos.getAllShorts);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView]);

  const shorts = data?.pages?.map((page) => page?.data || [])?.flat() || [];
  return (
    <ShortsContext.Provider
      value={{
        shorts,
        isLoading,
        inViewRef: ref,
        hasNextPage,
        isFetchingNextPage,
      }}
    >
      <Suspense>{children}</Suspense>
    </ShortsContext.Provider>
  );
}
