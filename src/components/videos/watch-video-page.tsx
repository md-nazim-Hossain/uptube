"use client";
import { IAPIResponse, IVideo } from "@/types";
import { useFetch } from "@/utils/reactQuery";
import { apiRoutes } from "@/utils/routes";
import React from "react";
import HomePageSkeleton from "../skeletons/home-page-skeleton";
import EmptyState from "../empty-state";
import FullViewVideo from "./full-view-video";

type IWatchVideoPageProps = {
  videoId: string;
};
function WatchVideoPage({ videoId }: IWatchVideoPageProps) {
  const { data, isLoading } = useFetch<IAPIResponse<IVideo>>(
    apiRoutes.videos.getVideoById + videoId,
    undefined,
    {
      queryKey: [apiRoutes.videos.getVideoById + videoId, undefined],
      enabled: !!videoId,
    },
  );
  if (isLoading) return <HomePageSkeleton />;
  const video = data?.data as IVideo;
  if (!video)
    return <EmptyState text={"This video isn't available any more"} />;
  return <FullViewVideo video={video} />;
}

export default WatchVideoPage;
