"use client";

import { IAPIResponse, IInfiniteScrollAPIResponse, IVideo } from "@/types";
import { useLoadMore } from "@/utils/reactQuery";
import { apiRoutes } from "@/utils/routes";
import {
  FetchNextPageOptions,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";
import { useParams } from "next/navigation";
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
  fetchNextPage: (
    options?: FetchNextPageOptions,
  ) => Promise<
    InfiniteQueryObserverResult<IInfiniteScrollAPIResponse<IVideo[]>, Error>
  >;
};
const ShortsContext = createContext<IShortContext>({
  isLoading: false,
  shorts: [],
  inViewRef: () => {},
  hasNextPage: false,
  isFetchingNextPage: false,
  fetchNextPage: () => Promise.resolve({} as any),
});
export function useShortsProvider() {
  return useContext(ShortsContext);
}

type IProvider = {
  children: ReactNode;
  initialData: IAPIResponse<IVideo[]>;
};
export default function ShortsProvider({ children, initialData }: IProvider) {
  const { id } = useParams();
  const { ref, inView } = useInView();
  const {
    data,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isFetching,
  } = useLoadMore<IVideo[]>(
    apiRoutes.videos.getAllShorts,
    { id },
    [initialData],
    { enabled: !!id },
  );

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
        isLoading: isLoading || isFetching,
        inViewRef: ref,
        hasNextPage,
        isFetchingNextPage,
        fetchNextPage,
      }}
    >
      <Suspense>{children}</Suspense>
    </ShortsContext.Provider>
  );
}
