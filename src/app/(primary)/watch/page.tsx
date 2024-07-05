"use client";
import React from "react";
import FullViewVideo from "./_components/full-view-video";
import { redirect, useSearchParams } from "next/navigation";
import { apiRoutes } from "@/utils/routes";
import { IAPIResponse, IVideo } from "@/types";

import { useFetch } from "@/utils/reactQuery";
import HomePageSkeleton from "@/components/skeletons/home-page-skeleton";
function WatchPage() {
  const v = useSearchParams().get("v");
  const { data, isLoading, isError } = useFetch<IAPIResponse<IVideo>>(
    apiRoutes.videos.getVideoById + v,
    undefined,
    {
      queryKey: [apiRoutes.videos.getVideoById + v, undefined],
      enabled: !!v,
    },
  );

  if (isLoading) return <HomePageSkeleton />;
  const video = data?.data as IVideo;
  if (!video || isError) redirect("/");
  return <FullViewVideo video={video} />;
}

export default WatchPage;
