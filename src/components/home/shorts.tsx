"use client";

import React from "react";
import DiscoverSlider from "../slider/discover-slider";
import { Typography } from "../ui/typography";
import { useFetch } from "@/utils/reactQuery";
import { apiRoutes } from "@/utils/routes";
import { IAPIResponse, IVideo } from "@/types";
import { Skeleton } from "../ui/skeleton";
import ShortsSlider from "../slider/shorts-slider";
function Shorts() {
  const { data, isLoading } = useFetch<IAPIResponse<{ data: IVideo[] }>>(
    apiRoutes.videos.getAllContentByType + "?type=short",
  );
  if (isLoading)
    return (
      <div className="flex-1 space-y-5 pb-5">
        <Skeleton className="w-1/4 h-6" />
        <Skeleton className="w-full h-[600px]" />
      </div>
    );
  const shortVideos = data?.data?.data || [];
  if (!shortVideos.length) return null;
  return (
    <>
      <Typography variant={"h3"}>Shorts</Typography>
      <ShortsSlider shorts={shortVideos?.slice(0, 10)} />
    </>
  );
}

export default Shorts;
