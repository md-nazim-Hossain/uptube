"use client";
import { IAPIResponse, IVideo } from "@/types";
import { useFetch } from "@/utils/reactQuery";
import { apiRoutes } from "@/utils/routes";
import { useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";

type Props = {
  videoId: string;
  revalidateQueryKey: string;
};
function ViewCount({ videoId, revalidateQueryKey }: Props) {
  const queryClient = useQueryClient();
  useFetch<IAPIResponse<IVideo>>(
    apiRoutes.videos.updateViewCount + videoId,
    undefined,
    {
      queryKey: [apiRoutes.videos.updateViewCount + videoId, undefined],
      enabled: !!videoId,
    },
  );

  useEffect(() => {
    if (revalidateQueryKey) {
      queryClient.invalidateQueries({
        queryKey: [revalidateQueryKey, undefined],
      });
    }
  }, [queryClient, revalidateQueryKey]);

  return <></>;
}

export default ViewCount;
