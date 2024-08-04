import { IVideo } from "@/types";
import { useLoadMore } from "@/utils/reactQuery";
import { apiRoutes } from "@/utils/routes";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export const useShorts = () => {
  const [loading, setLaoding] = useState(true);
  const { id } = useParams();
  const { ref, inView } = useInView();
  const {
    data,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isFetching,
  } = useLoadMore<IVideo[]>(apiRoutes.videos.getAllShorts, { id });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView]);

  useEffect(() => {
    if (!isFetching && !isLoading) {
      setLaoding(false);
    }
  }, [isFetching, isLoading]);

  return {
    pages: data?.pages || [],
    isLoading: loading,
    inViewRef: ref,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  };
};
